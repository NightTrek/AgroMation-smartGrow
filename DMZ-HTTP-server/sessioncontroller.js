const expirationInterval = 5 * 60;


const createNewSession = async (db, UID, deviceList) => {
    return new Promise(async (resolve, reject) => {
        if (!db) {
            reject({ error: 'Firebase DB undefined' });
        };
        if (!UID || typeof UID !== 'string') {
            reject({ error: 'UID undefined' });
        };
        if (!deviceList || !deviceList[0] || typeof deviceList[0] !== 'string') {
            reject({ error: 'DeviceList is invalid' });
        };
        let topicList = [];
        deviceList.forEach((item, index) => {
            topicList.push(item + "/data/Live")
            topicList.push(item + "/data/History")
        })

        let output = {
            createdTime: Math.floor(Date.now() / 1000),
            expTime: Math.floor(Date.now() / 1000) + expirationInterval,
            ownerUID: UID,
            topics: topicList
        }
        try {
            let newClientSession = await db.collection('ClientSessions').add(output)
            if (newClientSession) {
                output.id = newClientSession.id
                resolve(output);
            }
        } catch (err) {
            console.log(err)
            reject(err)
        }

    })

}

const updateSession = async (db, clientSessionID, prevExpTime) => {
    return new Promise(async (resolve, reject) => {
        if (!db) {
            reject({ error: 'Firebase DB undefined' });
        };
        if (!clientSessionID || typeof clientSessionID !== 'string') {
            reject({ error: 'UID undefined' });
        };
        if (!prevExpTime) {
            reject({ error: 'prevExpTime undefined' });
        }

        let sessionRef = db.collection('ClientSessions').doc(clientSessionID);
        db.runTransaction((transaction) => {
            return transaction.get(sessionRef).then((SessionDoc) => {
                if (!SessionDoc.exists) {
                    throw new Error("Document does not exist")
                }
                let data = SessionDoc.data();
                if (data.expTime >= prevExpTime + expirationInterval) {
                    return data
                }
                else {
                    data.expTime = prevExpTime + expirationInterval;
                    transaction.update(sessionRef, data);
                    data.doc = SessionDoc.id;
                    return data;
                }
            }).then((output) => {
                resolve(output)

            }).catch((err) => {
                console.log(err);
                reject(err)
            })
        })
        ///END OF update Transaction

    })

}

//takes a topic object and adds or updates the topic object with new expTimes and new topics
const updateTopics = (originalTopics, newtopics, expTime) => {
    let output = originalTopics;
    let expiredTopics = [];
    newtopics.forEach((item) => {
        //here we check to see if the topic is expired and there for does not already have a subscription and will need to be subscribed
        // if the original topics is undefined its automatically added to sub list
        if(!originalTopics[item] || originalTopics[item] < Math.floor(Date.now() / 1000) ){
            expiredTopics.push(item);
        }
        output[item] = expTime;
        
    });
    // console.log(expiredTopics);
    return {
        newSubs:expiredTopics,
        newGlobalTopicsObject:output
    };
}


const updateLiveData = async (db, docRef, input) => {
    // console.log('updating live data')
    return new Promise((resolve, reject) => {
        if(!docRef || !input || !input.temp || !input.co2 || !input.vpd || !input.rh){
            throw new Error("missing inputs or docRef");
        }
        db.runTransaction((transaction) => {
            return transaction.get(docRef).then((liveDataDoc) => {
                if (!liveDataDoc.exists) {
                    throw new Error("Document does not exist")
                }
                let data = liveDataDoc.data();
                if(data.temp == input.temp && data.rh == input.rh && data.co2 == input.co2 && data.vpd == input.vpd ){
                    console.log('no need to update live data')
                    return data;
                }else{
                    transaction.update(docRef, input);
                }
         
            }).then((output) => {
                resolve(output)
    
            }).catch((err) => {
                console.log(err);
                reject(err)
            })
        })
    })  
}

const updateHistory = async (db, docRef, input) => {
    return new Promise((resolve, reject) => {
        if(!docRef || !input ){
            throw new Error("missing inputs or docRef");
        }
        db.runTransaction((transaction) => {
            return transaction.get(docRef).then((min30HistoryDoc) => {
                if (!min30HistoryDoc.exists) {
                    throw new Error("Document does not exist")
                }
                let data = min30HistoryDoc.data();
                if(data.data == input.data){
                    return data;
                }else{
                    transaction.update(docRef, input);
                }
         
            }).then((output) => {
                resolve(output)
    
            }).catch((err) => {
                console.log(err);
                reject(err)
            })
        })
    })

}

module.exports = {
    createNewSession: createNewSession,
    updateSession:updateSession,
    updateTopics:updateTopics,
    updateLiveData:updateLiveData,
    updateHistory:updateHistory
}
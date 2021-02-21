const mqtt = require('mqtt')


const mqttURL = "mqtt://100.96.1.66";
const mqttClientOptions = {
    username: "",
    password: "",
    connectTimeout: 30 * 1000,

}

const dataHistory = "dataHistory";
const dataLive = "Live"
const inputFolder = "config";
const outputFolder = "data";

const createChannelURLString = (deviceID, folder = outputFolder, item = dataLive) => {
    if (!deviceID) {
        console.log("error no deviceID");
        return { error: "DEVICEID UNDEFINED" };
    }
    return deviceID + "/" + folder + "/" + item
}

//working
const connectAndGetLiveData = (deviceID) => {
    const subscriptionOptions = {
        rh: true
    }
    return new Promise((resolve, reject) => {
        const client = mqtt.connect(mqttURL, mqttClientOptions)
        //add error handling
        client.on('error', (error) => {
            console.log(error)
            reject(error);
        })
        //Once the client is connected handle subscriptions
        client.on('connect', function () {
            const subURI = createChannelURLString(deviceID, outputFolder, dataLive);
            client.subscribe(subURI, subscriptionOptions, function (err, granted) {
                if (err) {
                    //reject if there is an error
                    reject(err);
                }
            })
        })

        //handle reciving any messages in the broker.
        client.on('message', function (topic, message) {
            resolve(JSON.parse(message.toString()));
            client.end()
        })
    })
}

const createMqttClient = () => {
    return new Promise((resolve, reject) => {
        const client = mqtt.connect(mqttURL, mqttClientOptions)
        //add error handling
        client.on('error', (error) => {
            console.log(error)
            reject(error);
        })
        //Once the client is connected handle subscriptions
        client.on('connect', function () {
            resolve(client);
        })
    });
}

//Promise based wrapper for creating subscriptions. can take list of device ID's
//NEEDS testing for multiple subs
const createTopicsAndSub = (client, deviceID, type = "live") => {
    return new Promise((resolve, reject) => {
        const subscriptionOptions = {
            rh: true
        }
        let subURIList = []
        //if deviceID is an array then for each item add URI to list according to type
        if (typeof deviceID !== 'string' && deviceID.length > 1) {
            //handle multiple devices being subscribed.
            deviceID.forEach((item, index) => {
                // subscribes client to either live data or data history changes
                switch (type) {
                    case "live":
                        subURIList.push(createChannelURLString(item, outputFolder, dataLive));
                        break;
                    case "history":
                        subURIList.push(createChannelURLString(item, outputFolder, dataHistory));
                        break
                    case 'both':
                        subURIList.push(createChannelURLString(item, outputFolder, dataLive));
                        subURIList.push(createChannelURLString(item, outputFolder, dataHistory));
                        break;
                }
            })
        }else{
            //handle one  device being subscribed.
            let currentDevice;
            if(typeof deviceID !== 'string'){
                currentDevice = deviceID[0];
            }else{
                currentDevice = deviceID;
            }
            //then build the subURIList based on the single device ID
            switch (type) {
                case "live":
                    subURIList.push(createChannelURLString(currentDevice, outputFolder, dataLive));
                    break;
                case "history":
                    subURIList.push(createChannelURLString(currentDevice, outputFolder, dataHistory));
                    break
                case 'both':
                    subURIList.push(createChannelURLString(currentDevice, outputFolder, dataLive));
                    subURIList.push(createChannelURLString(currentDevice, outputFolder, dataHistory));
                    break;
            }

        }

        client.subscribe(subURIList, subscriptionOptions, (err, granted) => {
            if (err) {
                reject(err);
            } else {
                let outputTopicList = [];
                granted.forEach((item) => {
                    outputTopicList.push(item.topic);
                })
                resolve(outputTopicList);
            }
        })
    })
}

const createSub = (client, topicList) => {
    return new Promise((resolve, reject) => {
        const subscriptionOptions = {
            rh: true
        }
        if(!client || !topicList){
            reject({error:"client or topicList undefined"})
        }
        

        client.subscribe(topicList, subscriptionOptions, (err, granted) => {
            if (err) {
                reject(err);
            } else {
                let outputTopicList = [];
                granted.forEach((item) => {
                    outputTopicList.push(item.topic);
                })
                resolve(outputTopicList);
            }
        })
    })
}

//Promise based wrapper for removing list of subscriptions.
const removeSubs = (client, topicList) => {
    return new Promise ((resolve, reject) => {
        client.unsubscribe(topicList, (err) => {
            if(err){
                reject(err);
            }else{
                resolve(topicList)
            }
        })
    })
}


//promise based wrapper which recives ONE msg 
const clientMsg = (client) => {
    return new Promise((resolve, reject) => {
        //handle reciving any messages in the broker.
        client.on('error', function (err) {
            // message is Buffer
            console.log(err)
            reject(err);
        })
        client.on('message', function (topic, message) {
            // message is Buffer
            // console.log(message.toString())
            resolve({
                topic: topic,
                msg: JSON.parse(message.toString())
            });
        })
    })
}
//handles converting stream to JSON object.
const reciveMsg = (topic, message) => {
    return {
        topic: topic,
        msg: JSON.parse(message.toString())
    };
}

//
const clientMsgHandler = (client, callback) => {
    client.on("message", (topic, msg) => {
        callback(reciveMsg(topic,msg));
    })
}



module.exports = {
    connectAndGetLiveData: connectAndGetLiveData,
    createMqttClient: createMqttClient,
    createSub: createSub,
    removeSubs:removeSubs,
    createChannelURLString: createChannelURLString,
    clientMsg: clientMsg,
    clientMsgHandler:clientMsgHandler,
    reciveMsg: reciveMsg,

}
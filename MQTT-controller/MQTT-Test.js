const mqtt = require('./MQTT');



const testGetLiveData = async () => {
    let res = await mqtt.connectAndGetLiveData("AgroOffice1");
    if(res.main){
        return true;
    }

}

const testClientAndSub = async (count=0, stopcount=1) => {
    try{
        let client = await mqtt.createMqttClient();
        try{
            //subscribe to the history object.
           let granted = await mqtt.createSub(client, "AgroOffice1", "both");
           console.log(granted);
           try{
               //once recived send the history object.
                mqtt.clientMsgHandler(client, async (msg) => {
                    console.log(msg);
                    if(count>stopcount){
                        await mqtt.removeSubs(client, granted);
                        console.log('Removed subscriptions')
                        client.end()
                    }
                    count++;
                })
           }catch(err){
                console.log(err)
                console.log("reciving msg error");
                client.end()
                return false;
           }
        }catch(err){
            console.log(err)
            console.log("sub error")
            client.end()
            return false;
        }
    }catch(err){
        console.log("client error")
        console.log(err);
        client.end()
        return false;
    }
}

// testClientAndSub()

const getTime = () => {
    return Math.floor(Date.now() / 1000)
}

console.log(getTime())
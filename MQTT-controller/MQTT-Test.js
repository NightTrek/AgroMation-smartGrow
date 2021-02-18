const mqtt = require('./MQTT');



const testGetLiveData = async () => {
    let res = await mqtt.connectAndGetLiveData("AgroOffice1");
    if(res.main){
        return true;
    }

}

const testClientAndSub = async () => {
    try{
        let client = await mqtt.createMqttClient();
        try{
            //subscribe to the history object.
           let granted = await mqtt.createSub(client, "AgroOffice1", "both");
           try{
               //once recived send the history object.
                let msg = await mqtt.clientMsg(client);
                console.log(msg);
                if(msg.topic){
                    console.log('msg recived')
                    client.end()
                    return true;
                }
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

testClientAndSub()
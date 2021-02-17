const mqtt = require('mqtt')


const mqttURL = "mqtt://100.96.1.66";
const mqttClientOptions = {
    username: "",
    password: "",
    connectTimeout: 30 * 1000,

}

const dataHistory = "dataHistory";
const dataLive = "live"
const inputFolder = "config";
const outputFolder = "data";

const createChannelURLString = (deviceID, folder=outputFolder, item=dataLive) => {
    if(!deviceID){
        console.log("error no deviceID");
        return {error:"DEVICEID UNDEFINED"};
    }
    return deviceID+"/"+folder+"/"+item
}


const connectAndGetLiveData = (deviceID) => {
    const subscriptionOptions = {
        rh:true
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
            console.log(client);
            const subURI = createChannelURLString(deviceID, outputFolder, dataLive);
            client.subscribe(subURI, subscriptionOptions,  function (err, granted) {
                if (!err) {
                    console.log(granted);
                }else{
                    reject(err);
                }
            })
        })

        //handle reciving any messages in the broker.
        client.on('message', function (topic, message) {
            // message is Buffer
            console.log(message.toString())
            resolve(message);
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

const createSub = (client, deviceID, type="live") => {
    const subscriptionOptions = {
        rh:true
    }
    let subURI;
    // subscribes client to either live data or data history changes
    switch (type) {
        case "live":
            subURI = createChannelURLString(deviceID, outputFolder, dataLive);
            break;
        case "history":
            subURI = createChannelURLString(deviceID, outputFolder, dataHistory);
            break
    }
    client.subscribe(subURI, subscriptionOptions, (err, granted) => {
        if(err){
            reject(err);
        }else{
            resolve(granted);
        }
    })
}

module.exports = {
    connectAndGetHistoricalData: connectAndGetLiveData,
    createMqttClient:createMqttClient,
    createSub:createSub,
    createChannelURLString:createChannelURLString,
}
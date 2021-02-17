const mqtt = require('./MQTT');



const main = async () => {
    let res = await mqtt.connectAndGetHistoricalData("AgroOffice1");
    console.log(res)

}


main();
const express = require('express')
const mqtt = require('../MQTT-controller/MQTT');
const app = express()
const port = 3000;

//create MQTT client connected to the local Broker
let client;
try{
    client = await mqtt.createMqttClient();
}catch(err){
    console.log(err)
}

//get a list of devices from firebase

let deviceSubs = {
    AgroOffice1:{
        live:{},
        dataHistory:{}
    },
}

let sesssions = {
    'UID':{
        createdTime
    }
}

//potentially start subscriptions to the live and historical data objects for each device


//api to test if server is up
app.get('/ping', (req, res) => {
  res.send('DMZ-connector-ping')
})

//this is called when the app logs in to smart grow This opens subscriptions to every deviceID and caches the historical data in deviceSubs
app.post('/api/session', async (req, res) => {
let {UID, deviceIDList} = req.body;
//check if sesion is open under that UID
//create session by adding to sessions object
//subscribe to each Device
//cache the live data and historical data object to each device.
//return a list of deviceSub objects with the live data and historical data objects

})

//closes the session and stops the subscriptions. 
app.post('/api/sessionEnd', async (req, res) => {
let {UID} = req.body;
// get the device list for that UID session
// for each device listed unsubscribe.

})

//subscribbe to the device history object.
app.post("/api/history", async (req, res) => {
    let input = req.body;
    try{
        //subscribe to the history object.
       let granted = await mqtt.createSub(client, input.deviceID, "history");
       try{
           //once recived send the history object.
            let msg = await mqtt.clientMsg(client);
            res.send(msg)
       }catch(err){
            console.log(err)
           res.send(err)
       }
    }catch(err){
        console.log(err)
        res.send(err)
    }
    
})

//get current polled live data
app.get('/api/live/:deviceID', async (req ,res) => {

})







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
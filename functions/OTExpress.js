const express           =   require('express');
const cors              =   require('cors');
const functions         =   require('firebase-functions');
const axios             =   require('axios')
const mqtt              =   require('./mqttClient');
const app = express();

//OTExpress is an express server which handles all services connected to the OT-DMZ VM.
//This included the following functions
//ping - which pings the DMZ connector and returns the string response or error
//pingTest - which returns a string if the function is working
//mqttTest - which validated that the MQTT broker is running on the OT-DMZ-connector
//api functions
//session - starts a new monitoring session for the given UID and deviceIDList
//endSession - tells the connector to 
//startSession - expiremental ofload functions running on the VM to cloud functions
//









//middleware
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(express.json());
// build multiple CRUD interfaces:
app.get('/ping', async (req, res) => {
    functions.logger.warn("Testing /pingOT");
    try {
        let response = await axios.get('http://10.128.0.7:1420/ping');
        functions.logger.warn(response.status);
        res.send(response.data)
    } catch (err) {
        functions.logger.error(err);
        res.send({ error: err })
    }
});

app.get('/pingTest', async (req, res) => {
      res.send("testing Ping worked")
});

app.get('/mqttTest', async (req, res) => {
    functions.logger.warn('/mqttTest');
    try{
        let data = await mqtt.connectAndGetLiveData('A4fhbNNtES5S5Hnj0qST')
        functions.logger.warn(data);
        res.send({msg:'yes!', data:data})
    }catch(err){
        functions.logger.error(err);
        res.send({msg:'failed', err:err})
    }
})

app.post('/api/session', async (req, res) => {
        //check and make sure we are getting this object
        let test = {
            "UID":"9bVgzHIlpGNqyWhOULNNBf36Gpg1",
            "deviceIDList":[
                "A4fhbNNtES5S5Hnj0qST"
            ]
        };

        let { UID, deviceIDList } = req.body;
        if(!UID){
            functions.logger.error(req.body)
            res.send({error:'error UID undefined'})
        }
        if(!deviceIDList){
            res.send({error:'error DeviceIDList missing'})
        }
        let sessionConfig = {
            UID:UID,
            deviceIDList:deviceIDList
        }
        try{
            let response = await axios.post("http://10.128.0.7:1420/api/session", test, {
                headers:{
                    "content-type":"application/json"
                }
            })
            if(response.status === 200){
                res.send(response.data);
            }else{
                res.send(response.status)
            }
        }catch(err){
            functions.logger.error(err)
            res.send(err)
        }
        
    
})


// Expose Express API as a single Cloud Function:
module.exports = app
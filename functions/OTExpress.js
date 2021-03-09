const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios')
const mqtt = require('./mqttClient');
const cookieParser = require('cookie-parser')();
var serviceAccount = require("./agroFireBaseAdmin.json");

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


//Middleware for authenticating requests using firebase Token and Admin Api
const validateFirebaseIdToken = async (req, res, next) => {

    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
        return;
    }
}

//middleware
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(express.json());
app.use(validateFirebaseIdToken);







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
    try {
        let data = await mqtt.connectAndGetLiveData('A4fhbNNtES5S5Hnj0qST')
        functions.logger.warn(data);
        res.send({ msg: 'yes!', data: data })
    } catch (err) {
        functions.logger.error(err);
        res.send({ msg: 'failed', err: err })
    }
})

app.post('/api/session', async (req, res) => {
    //check and make sure we are getting this object
    let test = {
        "UID": "9bVgzHIlpGNqyWhOULNNBf36Gpg1",
        "deviceIDList": [
            "A4fhbNNtES5S5Hnj0qST"
        ]
    };

    let { UID, deviceIDList } = req.body;
    if (!UID) {
        functions.logger.error(req.body)
        res.send({ error: 'error UID undefined' })
    }
    if (!deviceIDList) {
        res.send({ error: 'error DeviceIDList missing' })
    }
    let sessionConfig = {
        UID: UID,
        deviceIDList: deviceIDList
    }
    try {
        let response = await axios.post("http://10.128.0.7:1420/api/session", test, {
            headers: {
                "content-type": "application/json"
            }
        })
        if (response.status === 200) {
            res.send(response.data);
        } else {
            res.send(response.status)
        }
    } catch (err) {
        functions.logger.error(err)
        res.send(err)
    }


})


// Expose Express API as a single Cloud Function:
module.exports = app
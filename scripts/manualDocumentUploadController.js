const F = require("../config/fireAdmin");
///hello
const admin = require('firebase-admin');
const { db } = require("../config/fireAdmin");

const app = admin.initializeApp({
    credential: admin.credential.cert(F.serviceAccount),
    databaseURL: "https://agromation-grow-room-control.firebaseio.com"
});

const exampleInputData = {
    UID: undefined,
    firstName: "Daniel",
    lastName: " Coffee",
    accountOwner: null,
    accountType: "SUPER",
    email: "daniels@dual4t.com",
    phone: "6503888615",
    location: [
        {
            name: "Green Gardens",
            address: "9898 Trent Bypass suite 541",
            locationID:F.db.collection('Locations').doc('Y1chmcEmlfL1ZAWLVDhK')
        },
        {
            name: "Desert Warhouse",
            address: "312 Palm Springs Blvd",
            locationID: F.db.collection('Locations').doc('Y1chmcEmlfL1ZAWLVDhK')
        },
        {
            name: "Hilltop Garden",
            address: "420 Trent Bypass suite 541",
            locationID: F.db.collection('Locations').doc('Y1chmcEmlfL1ZAWLVDhK')
        },
    ]
};


const roomData = [
    {
        name: "Room Alpha",
        tempSetPoint: 72,
        tempMax:80,
        tempMin:65,
        humiditySetPoint: 44,
        humidityMax:50,
        humidityMin:35,
        CO2SetPoint: 3000,
        CO2Max:3200,
        CO2Min:2800,
        pressureSetPont: 1114,
        pressureMax:1180,
        pressureMin:1070,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime: 864000,
        VegTime: 3024000,
        FlowerTime: 2419200,
        
    },
    {
        name: "Room Beta",
        tempSetPoint: 72,
        tempMax:80,
        tempMin:65,
        humiditySetPoint: 44,
        humidityMax:50,
        humidityMin:35,
        CO2SetPoint: 3000,
        CO2Max:2800,
        CO2Min:3200,
        pressureSetPont: 1114,
        pressureMax:1180,
        pressureMin:1070,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime: 864000,
        VegTime: 3024000,
        FlowerTime: 2419200,
    }, {
        name: "Clone Room",
        tempSetPoint: 72,
        tempMax:80,
        tempMin:65,
        humiditySetPoint: 44,
        humidityMax:50,
        humidityMin:35,
        CO2SetPoint: 3000,
        CO2Max:2800,
        CO2Min:3200,
        pressureSetPont: 1114,
        pressureMax:1180,
        pressureMin:1070,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime: 864000,
        VegTime: 3024000,
        FlowerTime: 2419200,
    }, {
        name: "Flower One",
        tempSetPoint: 83,
        tempMax:80,
        tempMin:65,
        humiditySetPoint: 70,
        humidityMax:50,
        humidityMin:35,
        CO2SetPoint: 3000,
        CO2Max:2800,
        CO2Min:3200,
        pressureSetPont: 1114,
        pressureMax:1180,
        pressureMin:1070,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime: 864000,
        VegTime: 3024000,
        FlowerTime: 2419200,
    }, {
        name: "Flower Two",
        tempSetPoint: 44,
        tempMax:80,
        tempMin:65,
        humiditySetPoint: 44,
        humidityMax:50,
        humidityMin:35,
        CO2SetPoint: 3000,
        CO2Max:2800,
        CO2Min:3200,
        pressureSetPont: 1114,
        pressureMax:1180,
        pressureMin:1070,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime: 864000,
        VegTime: 3024000,
        FlowerTime: 2419200,
    }, {
        name: "Veg Room A",
        tempSetPoint: 21,
        tempMax:80,
        tempMin:65,
        humiditySetPoint: 44,
        humidityMax:50,
        humidityMin:35,
        CO2SetPoint: 1118,
        CO2Max:2800,
        CO2Min:3200,
        pressureSetPont: 1114,
        pressureMax:1180,
        pressureMin:1070,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime: 864000,
        VegTime: 3024000,
        FlowerTime: 2419200,
    }];

const LightZoneArrayAlpha = [
    {
        name: "Zone two",
        active: false,
        activeCount: 6,
        fault: 0,
        intensity: 50,
        red: 50,
        yellow: 50,
        blue: 50,
        timeOn:"1700",
        timeOff:"0100",
        dateFirstStarted:1234567,
        totalRuntime:12
    },
    {
        name: "Zone three",
        active: true,
        lightCount: 6,
        fault: false,
        intensity: 50,
        red: 50,
        yellow: 50,
        blue: 50,
        timeOn:"1700",
        timeOff:"0100",
        dateFirstStarted:1234567,
        totalRuntime:12
    },
    {
        name: "Zone four",
        active:true,
        lightCount: 6,
        fault: false,
        intensity: 50,
        red: 50,
        yellow: 50,
        blue: 50,
        timeOn:"1700",
        timeOff:"0100",
        dateFirstStarted:1234567,
        totalRuntime:12
    },
    {
        name: "Zone five",
        active: true,
        lightCount: 6,
        fault: false,
        intensity: 50,
        red: 50,
        yellow: 50,
        blue: 50,
        timeOn:"1700",
        timeOff:"0100",
        dateFirstStarted:1234567,
        totalRuntime:12
    },
    {
        name: "Zone six",
        active: true,
        lightCount: 6,
        fault: false,
        intensity: 50,
        red: 50,
        yellow: 50,
        blue: 50,
        timeOn:"1700",
        timeOff:"0100",
        dateFirstStarted:1234567,
        totalRuntime:12
    }
    
]
const lightZoneBeta = [
    {
        name: "Mothers room one",
        active: true,
        lightCount: 6,
        fault: false,
        intensity: 50,
        red: 50,
        yellow: 50,
        blue: 50,
        timeOn:"1700",
        timeOff:"0100",
        dateFirstStarted:1234567,
        totalRuntime:12
    },
    {

        name: "Mothers room two",
        active: false,
        lightCount: 6,
        fault: false,
        intensity: 50,
        red: 50,
        yellow: 50,
        blue: 50,
        timeOn:"1700",
        timeOff:"0100",
        dateFirstStarted:1234567,
        totalRuntime:12
    },
    {
        name: "Clone zone 2",
        active: false,
        lightCount: 6,
        fault: false,
        intensity: 40,
        red: 40,
        yellow: 50,
        blue: 60,
        timeOn:"1700",
        timeOff:"0100",
        dateFirstStarted:1234567,
        totalRuntime:12
    },
    {
        name: "Clone zone 1",
        active: true,
        lightCount: 6,
        fault: false,
        intensity: 40,
        red: 40,
        yellow: 50,
        blue: 60,
        timeOn:"1700",
        timeOff:"0100",
        dateFirstStarted:1234567,
        totalRuntime:12
    },
]

const getUIDFromEmail = (email) => {
    return new Promise((resolve, reject) => {
        app.auth().getUserByEmail(email)
            .then(function (userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                //   console.log('Successfully fetched user UID and data:', userRecord.toJSON());
                if (userRecord.uid !== undefined) {
                    resolve(userRecord.uid);
                }
            })
            .catch(function (error) {
                console.log('Error fetching user data:', error);
                reject(error);
            });
    })

}
//checks if UID is a User and if not its adds a new User and returns a promise.
//the Promise is resolved with a new document reference. everything else is rejected
const addUserToFireStore = async (input) => {
    let UserRef = F.db.collection('Users')
    
    return new Promise(async(resolve, reject)=>{
        UserRef
        .where("UID", "==", input.UID)
        .get()
        .then((querySnapshot) => {
            if(querySnapshot.empty){
                UserRef.add(input).then((docRef)=>{
                    console.log("Document written with ID: ", docRef.id);
                    resolve(docRef)
                }).catch((err)=>{
                    reject(err)
                })
            }
            else{
                reject({msg:"input UID is present in the DB", data:querySnapshot[0]})
            }
            
        }).catch((error) => {
            reject(error)
            console.log(error)

        });

    })
};

//checks for UID
//Checks and validates the location array.
// checks and validates locationRefs ensures they are refs and not strings
const UploadUserJsonData = async (input) => {
    return new Promise( async(resolve, reject) => {
        if (input === undefined || input === null) {
            return "input object is undefined or null"
        } else if (input.UID !== undefined && input.UID !== null) {
            //do batch add using the UID
        }
        else {
            //use the admin sdk to get the UID from the email address 
            try {

                const UID = await getUIDFromEmail(input.email);
                //if the UID is found add it to the input object
                if(UID && typeof UID === "string"){
                    input.UID = UID;
                    //Here we are checking each location in the location array to make sure
                    let arrayOfMissingLocations = [];
                    for(let i = 0; i<input.location.length; i++){
                        //check the input location to ensure name and address are present
                        if(input.location[i].name && input.location[i].address){
                            //check if the refExists in the db and if not adds the location too the missing array
                            //also checks to make sure there is a ref and its not null
                            if(input.location[i].locationID && typeof input.location[i].locationID === "object" ){
                                const testLocation = await input.location[i].locationID.get()
                                if(!testLocation && !testLocation.name){
                                    arrayOfMissingLocations.push(input.location[i])
                                }
                            }else{
                                arrayOfMissingLocations.push(input.location[i])
                            }
                            
                        }
                        else{
                            reject({msg:"Locations missing name or address", location:location[i]})
                        }
                        
                    }
                    //if none of the locations are wrong and they are referenced add the User to firestore.
                    if(arrayOfMissingLocations.length === 0){
                        const newDocRef = await addUserToFireStore(input);
                        //validates to ensure User doc was added
                        if(newDocRef && newDocRef.id){
                            resolve(newDocRef)
                        }else{
                            reject({msg:"newDocRef undefined or has no id", newDocRef:newDocRef})
                        }
                    }
                    else{
                        //Handle adding missing lcoations
                        reject({msg:"missing locations in DB", arrayOfMissingLocations:arrayOfMissingLocations})
                    }
                    
                }
                else{
                    reject({msg:"User has no UID", UID:UID})
                }
                
                
            } catch (err) {
                console.log(err);
                reject({msg:"catch block error", err:err});
            }
        }
    })
    

    //check to ensure paramaters of the data are correct and if not throw and error and refuse top upload
    //batch upload each correct record 
    /// return string with success if upload works 
    //return false with the error code
}


const UploadRoom = async (input, UID, ZoneArray) => {
    return new Promise((resolve, reject) => {
        //check if UID is valid by finding the document for that UID in the db. reject if it does not exist
        try{
            const UserRecord = await db.collection('Users').where("UID", "==", UID).get()
            if(!UserRecord.exists){
                reject({msg:"User Record does not exist ", record:UserRecord})
            }
        }catch(err){
            reject({msg:"error getting document with that UID NOT FOUND", UID:UID, error:err})
        }

        //validate the different fields
        if(!input.FlowerTime || typeof input.FlowerTime !== 'number' || input.FlowerTime < 350){
            reject({msg:"FlowerTime invalid or less then 5 minutes in seconds", item:input.FlowerTime})
        }
        if(!input.VegTime || typeof input.VegTime !== 'number' || input.VegTime < 350){
            reject({msg:"VegTime invalid or less then 5 minutes in seconds", item:input.VegTime})
        
        }
        if(!input.CloneTime || typeof input.CloneTime !== 'number' || input.CloneTime < 350){
            reject({msg:"CloneTime invalid or less then 5 minutes in seconds", item:input.CloneTime})
        
        }
        if(!input.tempSetPoint || typeof input.tempSetPoint !== 'number' ){
            reject({msg:"tempSetPoint invalid or not a number", item:input.tempSetPoint})
        }
        if(!input.tempMin || typeof input.tempMin !== 'number' ){
            reject({msg:"tempMin invalid or not a number", item:input.tempMin})
        }
        if(!input.tempMax || typeof input.tempMax !== 'number' ){
            reject({msg:"tempMax invalid or not a number", item:input.tempMax})
        }
        if(!input.humiditySetPoint || typeof input.humiditySetPoint !== 'number' ){
            reject({msg:"humiditySetPoint invalid or not a number", item:input.humiditySetPoint})
        }
        if(!input.humidityMin || typeof input.humidityMin !== 'number' ){
            reject({msg:"humidityMin invalid or not a number", item:input.humidityMin})
        }
        if(!input.humidityMax || typeof input.humidityMax !== 'number' ){
            reject({msg:"humidityMax invalid or not a number", item:input.humidityMax})
        }
        if(!input.CO2SetPoint || typeof input.CO2SetPoint !== 'number' ){
            reject({msg:"CO2SetPoint invalid or not a number", item:input.CO2SetPoint})
        }
        if(!input.CO2Min || typeof input.CO2Min !== 'number' ){
            reject({msg:"CO2Min invalid or not a number", item:input.CO2Min})
        }
        if(!input.CO2Max || typeof input.CO2Max !== 'number' ){
            reject({msg:"CO2Max invalid or not a number", item:input.CO2Max})
        }
        if(!input.pressureSetPont || typeof input.pressureSetPont !== 'number' ){
            reject({msg:"pressureSetPont invalid or not a number", item:input.pressureSetPont})
        }
        if(!input.pressureMin || typeof input.pressureMin !== 'number' ){
            reject({msg:"pressureMin invalid or not a number", item:input.pressureMin})
        }
        if(!input.pressureMax || typeof input.pressureMax !== 'number' ){
            reject({msg:"pressureMax invalid or not a number", item:input.pressureMax})
        }
        if(!input.name || typeof input.name !== 'string' || input.name.length<3 ){
            reject({msg:"name invalid or not a string", item:input.name})
        }
        if(!input.stage || typeof input.stage !== 'string' || input.stage.length<3){
            reject({msg:"stage invalid or not a string", item:input.stage})
        }
        if(!input.dateStarted || typeof input.dateStarted !== 'number' ){
            reject({msg:"dateStarted invalid or not a number", item:input.dateStarted})
        }
        //validate the Zone Array
        if(ZoneArray.length === 0){
            reject({msg:"zone array invalid because it has zero length", zoneArray})
        }
        for(let i = 0; i<ZoneArray.length;i++){

        }

        input.ownerID = UID;


    })
    
}



//Checks ownerRef to ensure that its an object and then ensures there is actually a User document being referenced 
//Checks each Zone being uploaded in the array to ensure it has each item required for the schema
//uploaded each zone one by one adding the verified ownerRef as it goes. returns an array of objects with either success or error messages as well as the refs or errors
const UploadZones = async (inputArray, ownerRef) => {
    return new Promise(async(resolve, reject)  => {
        //validate the OwnerRef assuming its an object and getting the User document returns a document anything is rejected 
    if(ownerRef && typeof ownerRef === 'object'){
        try{
            const User = await ownerRef.get()
            if(!User || !User.exists){
                reject({msg:"User Ref not found in the DB", user:User})
            }
        }catch(err){
            reject({msg:"Error getting User from Ref", error:err})
        }
        
    }
    else{
        reject({msg:"ownerRef is either undefined or not an object", ownerRef:ownerRef})
    }
    let invalidItemsArray = [];
    //Validation step for the array
    //keep this code hidden for prettier code. sorry
    for(let i = 0; i<inputArray.length;i++){
        let item = inputArray[i];
        let invalidItems = {
            id: i,
        }
        if( typeof item.active !== "boolean"){
            invalidItems.active = "invalid active boolean"
        }
        if(!item.blue || typeof item.blue !== "number" || item.blue<0 || item.blue>100){
            invalidItems.blue = "invalid Blue which should be a number between 0-100";
        }
        if(!item.red || typeof item.red !== "number" || item.red<0 || item.red>100){
            invalidItems.red = "invalid red which should be a number between 0-100";
        }
        if(!item.yellow || typeof item.yellow !== "number" || item.yellow<0 || item.yellow>100){
            invalidItems.yellow = "invalid yellow which should be a number between 0-100";
        }
        if(!item.name || typeof item.name !== 'string' || item.name.length<3){
            invalidItems.name = "invalid zone name should be string greater then 3 characters";
        }
        if(!item.intensity || typeof item.intensity !== "number" || item.intensity<0 || item.intensity>100){
            invalidItems.intensity = "invalid zone intensity should be number between 0-100";
        }
        if(!item.dateFirstStarted || typeof item.dateFirstStarted !== 'number'){
            invalidItems.dateFirstStarted = "invalid start time should be a number and unix timestamp 0 if it has not started yet";
        }
        if(!item.lightCount || typeof item.lightCount !== 'number' ){
            invalidItems.lightCount = "invalid lightCount should be a number";
        }
        if(!item.totalRuntime || typeof item.totalRuntime !== 'number' ){
            invalidItems.totalRuntime = "invalid totalRuntime should be a number";
        }
        if(!item.timeOff || typeof item.timeOff !== 'string' ){
            invalidItems.timeOff = "invalid timeOff should be a military time string";
        }
        if(!item.timeOn || typeof item.timeOn !== 'string' ){
            invalidItems.timeOn = "invalid timeOn should be a military time string";
        }
        if(typeof item.fault !== 'boolean'){
            invalidItems.fault = " invalid fault should be a boolean value";
        }
        if(Object.keys(invalidItems).length > 1){
            invalidItemsArray.push(invalidItems)
        }
    }
    if(invalidItemsArray.length > 0){
        reject({msg:"input Zone array contains invalid fields", invalidItemsArray:invalidItemsArray})
    }
    //now that the data is validated we will add each document  one by one and store the resulting references and errors in the upload result array.
    let uploadResultArray = [];
    let errorCount = 0;
    for(let i = 0; i<inputArray.length;i++){
        let item = inputArray[i];
        item.ownerID = ownerRef;
        //here we actually upload the zone
        try{
            const docRef = await db.collection("LightZones").add(item);
            if(docRef && docRef.id && i<=3){
                uploadResultArray.push({msg:`SUCCESS for document ID: ${docRef.id}`, docRef:docRef, path: docRef.path})
            }
            else{
                errorCount++;
                uploadResultArray.push({msg:"error uploading zone", refFromError:docRef, path: docRef.path})
            }
        }catch(err){
            errorCount++;
            uploadResultArray.push({msg:"error uploading zone", error:err})
        }
        
    }
    if(uploadResultArray.length === inputArray.length && errorCount === 0){
        resolve({msg:"ALL DOCUMENTS UPLOADED", resultArray:uploadResultArray})
    }
    resolve({msg:"ERROR some documents were upload", resultArray:uploadResultArray})
    })
}



    const UserRef = db.collection('Users').doc('ahUzvP1mz461cWkIo9pK')

    UploadZones(exampleLightZoneArray,UserRef).then((output) => {
        console.log("========================================success======================================")
        console.log(output)
        
    }).catch((err) => {
        console.log(err)
    })

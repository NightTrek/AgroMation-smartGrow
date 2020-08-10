const sql           = require("./mysql2ORMController");
const logger        = require('../logs/Wlogger');

// todo create more status messages
// todo create grow room is off status message
createStatusMessage = (GrowRoomDataArray, setpoint, allowedVariation) => {
    let status = "";
    let meanObject = {
        temp1:0,
        temp2:0,
        temp3:0
    };
    for(let i = 0; i <GrowRoomDataArray.length;i++){
        meanObject.temp1 = meanObject.temp1+GrowRoomDataArray[i].temp1;
        meanObject.temp2 = meanObject.temp2+GrowRoomDataArray[i].temp2
        meanObject.temp3 = meanObject.temp3+GrowRoomDataArray[i].temp3
    }
    meanObject.temp1 = meanObject.temp1/GrowRoomDataArray.length;
    meanObject.temp2 = meanObject.temp2/GrowRoomDataArray.length;
    meanObject.temp3 = meanObject.temp3/GrowRoomDataArray.length;
    if(meanObject.temp1>setpoint+allowedVariation || meanObject.temp1 < setpoint-allowedVariation){
        return `mean temp ${meanObject.temp1} exceeded +- ${allowedVariation} `
    }
    return "Running Normally"

};

module.exports = {
    //requires a "serial" string in the req.headers
    addGrowRoom: async (req,res) => {//
        try {
            let con = await sql.GetConnection();
            let user = await sql.selectWhere(con,"users","id",req.user[0].id);
            if(user.length==0){
                res.status(404).json({ error: 'User not found' });
            }
            const InsertObj = {
                roomName:req.headers.roomName,
                location:req.headers.location,
                ownerID:req.user[0].id,
                serial:req.headers.serial,
                setPoint:"-40"
            };
            let growRooms = await sql.insertNewGrowRoom(con,InsertObj);
            con.end();
            console.log(growRooms);
            logger.log({
                level:"info",
                message:`Added grow room for user: ${req.headers.id}|| serial ${req.headers.serial}||`
            });
            res.status(200).json(growRooms);
        } catch(e) {
            console.log("ERROR");
            // console.log(e);
            logger.log({
                level:"error",
                message:`ERROR adding grow room for user: ${req.headers.id}|| serial ${req.headers.serial}||`
            });
            res.json(e);
        }
    },
// todo add error handling for if users grow room doesnt have data
    getGrowRoomsForUser: async (req,res) => {
        try {
            let con = await sql.GetConnection();
            let user = await sql.selectWhere(con,"users","id",req.user[0].id);
            if(user.length==0){
                res.status(404).json({ error: 'User not found' });
            }
            let growRooms = await sql.selectWhere(con,"growRooms","ownerID",req.user[0].id);
            let growRoomData = {
                UserGrowRooms:growRooms,
                GrowRoomDataByID:[]
            };
            for(let i =0; i<growRooms.length ;i++){
                console.log(growRooms[i].id);
                let response = await sql.selectGrowRoomDataForIDInDesc(con, growRooms[i].id, "timestamp");
                console.log(response[0][0]);
                growRooms[i].statusMsg = createStatusMessage(response[0],growRooms[i].setPoint, 5);

                growRoomData.GrowRoomDataByID.push(response[0][0]);

            }
            logger.log({
                level:"info",
                message:`got Grow room list for id: ${req.user[0].id}`
            })
            con.end();
            res.status(200).json(growRoomData);
        } catch(e) {
            console.log("ERROR");
            console.log(e);
            res.status(500).json(e);
        }
    },

    // return data for a grow room ID all of it in decs order
    getGrowRoomDataForID: async (req,res) => {
        try {
            let con = await sql.GetConnection();
            let user = await sql.selectWhere(con, "users", "id", req.user[0].id);
            if (user.length == 0) {
                res.status(404).json({error: 'User token not found'});
            }
            let growRoomData = await sql.selectGrowRoomDataForIDInDesc(con, req.headers.roomID,'timestamp')
            res.status(200).json(growRoomData[0]);
        }catch(e){
            console.log(e);
            res.status(500).json(e);
        }
    },
}

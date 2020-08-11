const sql   = require('../controllers/mysql2ORMController');
const fs    = require('fs');
const moment = require("moment");

class VirtualDataGenerator{
    constructor(growRoomID){
        this.generatorStartingState = {
            temp1:-40,
            temp2:-85,
            temp3:-62,
            ambientTemp:72,
            humidity:13
        };
        this.currentState = {
            temp1:-40,
            temp2:-85,
            temp3:-62,
            ambientTemp:72,
            humidity:13,
            timestamp:0
        };
        this.generatorHistory = [];
        this.state = {
            running:false,
            event:"none",
            startTimestamp:0,
            intervalID:{},
            timestamp:100,
            growRoomID:growRoomID
        };
        this.generateDatapoint            = this.generateDatapoint.bind(this);
        this.pushNewData                  = this.pushNewData.bind(this);
        this.upOrDown                     = this.upOrDown.bind(this);
    }
    async startGenerator(numOfDatapoint=120){
        console.log("starting Generator");
        let con = await sql.GetConnection();
        this.state.startTimestamp = moment().unix()-10800;
        this.currentState.timestamp = this.state.startTimestamp;
        for(let i = numOfDatapoint; i>0;i--){
            // if(this.state.running){
            //     i = 120;
            // };
            let data = this.pushNewData()
            let res = await this.StoreDataInSQL(con, data); //can be used locally to save directly to a local DB
        }
        con.end();
        
    };

    //A simple way to manually store virtual Generator data into the backend. default password is password
    // change it with the get connection function params
    async StoreDataInSQL(con, data){
        return new Promise(async (resolve,reject)=>{
            try{
                let res = await sql.insertGrowRoomData(con, data);
                if(res){
                    resolve(res);
                }
            }catch(e){
                console.log(e);
                reject(e);
            }
        });
    }

    pushNewData(maxDataLength=120){
        let cstate = this.currentState;
        let newData = this.generateDatapoint(cstate);
        if(this.generatorHistory.length>maxDataLength){
            this.generatorHistory.shift();
        }
        this.generatorHistory.push(newData);
        this.currentState = newData;
        // console.log(newData);
        return newData;
    }


    generateDatapoint(currentState) {
        let newState = {};
        newState.growRoomID=this.state.growRoomID;
        newState.temp1 = this.upOrDown(this.generatorStartingState.temp1,currentState.temp1,2) ? (currentState.temp1+Math.random()*0.3):(currentState.temp1-Math.random()*0.3);
        newState.temp2 = this.upOrDown(this.generatorStartingState.temp2,currentState.temp2,2) ? (currentState.temp2+Math.random()*0.3):(currentState.temp2-Math.random()*0.3);
        newState.temp3 = this.upOrDown(this.generatorStartingState.temp3,currentState.temp3,2) ? (currentState.temp3+Math.random()*0.3):(currentState.temp3-Math.random()*0.3);
        newState.ambientTemp = this.upOrDown(this.generatorStartingState.ambientTemp,currentState.ambientTemp,20) ? (currentState.ambientTemp+Math.random()*0.3):(currentState.ambientTemp-Math.random()*0.3);
        newState.humidity = this.upOrDown(this.generatorStartingState.humidity,currentState.humidity,2) ? (currentState.humidity+Math.random()*0.3):(currentState.humidity-Math.random()*0.3);
        newState.timestamp = currentState.timestamp+120;
        return newState;
    }
    //decided if the temp goes up or down based on the current temp and the starting temp and variability.
    //return true for positive number addition to temp and false for negative number
    upOrDown(startingTemp, currentTemp, variability){
        console.log(`stemp: ${startingTemp} || ctemp: ${currentTemp}|| var: ${variability} diff: ${startingTemp-currentTemp}`);
        // if the current is a positive number
        if(currentTemp > 0){
            // console.log("isPositive");
            //starting is 70 current is 60 diff 10
            //and the difference is a positive number meaning its less than it should be
            if(startingTemp-currentTemp>0){
                if(startingTemp-currentTemp>=variability){
                    //increase the number to keep it within the variability
                    // console.log("up");
                    return true;
                }
            }//starting is 70 current is 82 diff -12
                //is a negative difference
            else{
                if(startingTemp-currentTemp*-1>=variability){
                    // console.log("down");
                    return false;
                }
            }
        }// if the current temp is a negative number
        else if (currentTemp<0){
            //stemp: -40 || ctemp: -29.51||  diff: -10.48
            //stemp: -40 || ctemp: -15.71 diff: -24.28
            // console.log("is negative");
            //starting is -40 current is -55 diff 15
            //diff is positive number
            if(startingTemp-currentTemp >0){
                // console.log("diff is positive");
                if(startingTemp-currentTemp>=variability){
                    //increase the number to keep it within the variability
                    // console.log("up");
                    return true;
                }
            }
            else{
                // console.log("diff is negative");
                // console.log((startingTemp-currentTemp)*(-1) >=variability);

                //starting is -40 current is -32 diff -8
                if((startingTemp-currentTemp)*(-1) >=variability){
                    //increase the number to keep it within the variability
                    // console.log("down");
                    return false;
                }
            }
        }
        //if there is no difference or to generate a random move
        console.log("generating random move");
        if(Math.random()>0.5){
            return true;
        }
        else{
            return false;
        }
    }

}

module.exports = VirtualDataGenerator;

const VC1 = new VirtualDataGenerator(1);
const VC2 = new VirtualDataGenerator(2);
const VC3 = new VirtualDataGenerator(3);
const VC4 = new VirtualDataGenerator(4);

VC1.startGenerator(400);
VC2.startGenerator(400);
VC3.startGenerator(400);
VC4.startGenerator(400);
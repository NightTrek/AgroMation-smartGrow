

//Current Users Account DATA

export  const exampleAccount = {
        firstName:"Steve",
        lastName:" Coffee",
        location:[
            {
                name:"Green Gardens",
                address: "9898 Trent Bypass suite 541",
                locationID:"9812"
            },
            {
                name:"Desert Warhouse",
                address: "312 Palm Springs Blvd",
                locationID:"2142"
            },
            {
                name:"Hilltop Garden",
                address: "420 Trent Bypass suite 541",
                locationID:"4113"
            },
        ]
};

export const ExampleRoomData = [
    {
        name: "Room Alpha",
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
    },
    {
        name: "Room beta",
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
        name: "clone Room",
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
        name: "flower one",
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
        name: "flower two",
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
        name: "veg room a",
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


export const sampleTempData = [{ x: "Fault", y: 1, catName: "Fault" },
{ x: "Warning", y: 2, catName: "Warning" },
{ x: "Nominal", y: 5, catName: "Nominal" }
];
export const sampleHumidityData = [{ x: 1, y: 1, catName: "Fault" },
{ x: 2, y: 1, catName: "Warning" },
{ x: 3, y: 6, catName: "Nominal" }
];
export const sampleProgressData = [{ x: 1, y: 1, catName: "Clone" },
{ x: 2, y: 3, catName: "Veg" },
{ x: 3, y: 4, catName: "Flower" }
];
export const sampleCO2Data = [{ x: 1, y: 1, catName: "Fault" },
{ x: 2, y: 1, catName: "Warning" },
{ x: 3, y: 6, catName: "Nominal" }
];


export const sampleNotifications = [{
    type: "FAULT",
    room: "Room Alpha",
    msg: "Controller offline",
    timeStamp: "1597477764"
}, {
    type: "warning",
    room: "Room Beta",
    msg: "Temprature warning",
    timeStamp: "1597477764"
}, {
    type: "warning",
    room: "Clone Room",
    msg: "Temprature Warning",
    timeStamp: "1597477764"
}, {
    type: "warning",
    room: "Room Beta",
    msg: "Humidity Warning",
    timeStamp: "1597477764"
}, {
    type: "info",
    room: "Veg room Alpha",
    msg: "only 7 days left",
    timeStamp: "1597477764"
}, {
    type: "info",
    room: "Room Alpha",
    msg: "Temprature out of range",
    timeStamp: "1597477764"
}]
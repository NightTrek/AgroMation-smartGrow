const opcua = require('node-opcua');
const axios = require('axios');
const fs = require("fs");
const key = fs.readFileSync("openweathermap.key");
const unirest = require("unirest");




/*global require,console,setInterval */
Error.stackTraceLimit = Infinity;

/*global require,setInterval,console */


async function getCityWeather(city) {

    const result = await new Promise((resolve) => {
        unirest.get(
            "https://community-open-weather-map.p.rapidapi.com/weather?id=2172797"
            + "&units=metric"
            + "&mode=json"
            + `&q=${city}`)
            .header("X-RapidAPI-Host", "community-open-weather-map.p.rapidapi.com")
            .header("X-RapidAPI-Key", key)
            .end(
                (response) => resolve(response)
            );
    });
    if (result.status !== 200) {
        throw new Error("API error");
    }
    return result.body;
}



function unixEpoqToDate(unixDate) {
    const d = new Date(0);
    d.setUTCSeconds(unixDate);
    return d;
}

function extractUsefulData(data) {
    return {
        city: data.name,
        date: new Date(),
        observation_time: unixEpoqToDate(data.dt),
        temperature: data.main.temp,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        weather: data.weather[0].main
    };
}

const city_data_map = {};
const city_name = 'San Fransisco';


async function update_city_data(city) {

    try {
        const data = await getCityWeather(city);
        city_data_map[city] = extractUsefulData(data);
    }
    catch (err) {
        console.log("error city", city, err);
        return;
    }
}

// make a API call every 120 seconds
const interval = 120 * 1000;
setInterval(async () => {
    await update_city_data('San Fransisco');
}, interval);



function construct_my_address_space(server) {
    // declare some folders
    const addressSpace = server.engine.addressSpace;
    const namespace = addressSpace.getOwnNamespace();
    const objectsFolder = addressSpace.rootFolder;
    //add cities folder to objects folder
    const citiesNode = namespace.addFolder(objectsFolder, { browseName: "Cities" });

    // declare the city node
    const cityNode = namespace.addFolder(citiesNode, { browseName: city_name });
    // const history = namespace.addObject({
    //     browseName:"History",
    //     organizeBy:addressSpace.rootFolder.objectsFolder
    // });

    // add variables
    const Pressure = namespace.addAnalogDataItem({
        browseName: "Pressure",
        engineeringUnitsRange: {
            low:  0,
            high: 10.0
        },
        engineeringUnits: opcua.standardUnits.millibar,
        componentOf: cityNode,
        value: { get: function () { return extract_value(opcua.DataType.Double, city_name, "pressure"); } }
    });

    const Temp = namespace.addVariable({
        componentOf: cityNode,
        browseName: "Temperature",
        nodeId: `s=${city_name}-Temperature`,
        dataType: "Double",
        engineeringUnits: opcua.standardUnits.degree_celsius,
        value: { get: function () { return extract_value(opcua.DataType.Double, city_name, "temperature"); } }
    });
    const RL = namespace.addVariable({
        componentOf: cityNode,
        nodeId: `s=${city_name}-Humidity`,
        browseName: "Humidity",
        dataType: "Double",
        engineeringUnits: opcua.standardUnits.percent,
        value: { get: function () { return extract_value(opcua.DataType.Double, city_name, "humidity"); } }
    });
    // const Pressure = namespace.addVariable({
    //     componentOf: cityNode,
    //     nodeId: `s=${city_name}-Pressure`,
    //     browseName: "Pressure",
    //     dataType: "Double",
    //     engineeringUnits: opcua.standardUnits.millibar,
    //     value: { get: function () { return extract_value(opcua.DataType.Double, city_name, "pressure"); } }
    // });
    const Weather = namespace.addVariable({
        componentOf: cityNode,
        nodeId: `s=${city_name}-Weather`,
        browseName: "Weather",
        dataType: "String",
        value: { get: function () { return extract_value(opcua.DataType.String, city_name, "weather"); } }
    });

    // addressSpace.installHistoricalDataNode(Temp)
    // addressSpace.installHistoricalDataNode(RL)
    addressSpace.installHistoricalDataNode(Pressure)
    // addressSpace.installHistoricalDataNode(Weather)

}


function extract_value(dataType, city_name, property) {
    const city = city_data_map[city_name];
    if (!city) {
        return opcua.StatusCodes.BadDataUnavailable
    }

    const value = city[property];
    return new opcua.Variant({ dataType, value: value });
}

(async () => {

    try {

        const server = new opcua.OPCUAServer({
            port: 4334, // the port of the listening socket of the servery
            buildInfo: {
                productName: "WeatherStation",
                buildNumber: "7658",
                buildDate: new Date(2019, 6, 14),
            }
        });


        await server.initialize();

        construct_my_address_space(server);

        await server.start();

        console.log("Server is now listening ... ( press CTRL+C to stop)");
        console.log("port ", server.endpoints[0].port);
        const endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl;
        console.log(" the primary server endpoint url is ", endpointUrl);

    }
    catch (err) {
        console.log("Error = ", err);
    }
})();
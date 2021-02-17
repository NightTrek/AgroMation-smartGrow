const express = require('express')
const app = express()
const port = 3000;

let client;
try{
    let client = await createMqttClient();
}catch(err){
    console.log(err)
}



app.get('/ping', (req, res) => {
  res.send('DMZ-connector-ping')
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
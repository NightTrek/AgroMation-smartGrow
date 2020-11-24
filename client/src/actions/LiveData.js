import axios from "axios";
import {FETCH_RECENT,FETCH_RECENT_PENDING} from "./types"


const parseEwonLiveData = (rawData) => {
    const liveData = {}
    for(let i = 0; i<rawData.length;i++){
        if(typeof rawData[i] === 'string'){
            liveData[rawData[i]]= rawData[i+1]
        }
    }
    return liveData

}

export const Fetch_Recent =  () => async dispatch => {

    axios.get(`https://m2web.talk2m.com/t2mapi/get/${EwonName}/rcgi.bin/ParamForm?AST_Param=$dtIV$ftT&t2maccount=agro&t2musername=daniel&t2mpassword=${AccountPassword}&t2mdeveloperid=${DeveloperID}&t2mdeviceusername=${EwonUser}&t2mdevicepassword=${EwonPass}`, {})
        .then((res) => {
            let data = parseEwonLiveData(res.data.split(";"));

            console.log(data);
            LiveData.Temp = data.Temperature;
            LiveData.humidity = data.RH;
            LiveData.CO2Level = data.CO2;
        }).catch((err) => {
           console.log(err); 
        })
}
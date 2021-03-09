import axios from "axios";
import { FETCH_RECENT, SESSION_ERROR, SESSION_START } from "./types"
import {getIdToken} from "../consts/firebase";



export const StartSession = (UID, deviceIDList) => async dispatch => {
    if(!UID || typeof UID !== 'string'){
        return new Error("start session missing UID");
    }
    if(!deviceIDList || deviceIDList.length < 1){
        return new Error('start session missing device ID list');
    }
    getIdToken().then((token) => {
        let reqConfig = {
            headers: {
                'Authorization': 'Bearer ' + token  //firebase.auth().currentUser.getIdToken()
            }
        }
        let input = {
            "UID": UID,
            "deviceIDList": deviceIDList
        };
    
        axios.post(`https://us-central1-agromation-grow-room-control.cloudfunctions.net/OTService/api/session`, input, reqConfig)
            .then((res) => {
    
                if (res.status === 200) {
                    console.log("success")
                    console.log(res.data);
                    dispatch({ type: SESSION_START, payload: res.data })
                }else{
                    dispatch({type: SESSION_ERROR, payload: res.data})
                }
    
            }).catch((err) => {
                console.log(err);
                dispatch({type: SESSION_ERROR, payload: err})
            })
    }).catch((err) => {
        console.log(err)
    });
    
}
import axios from "axios";
import { FETCH_LIVE, SESSION_ERROR, SESSION_START, FETCH_HISTORY, FETCH_ALARMS } from "./types"
import { getIdToken, db } from "../consts/firebase";

const expirationInterval = 1 * 60;


export const StartSession = (UID, deviceIDList) => async dispatch => {
    if (!UID || typeof UID !== 'string') {
        return new Error("start session missing UID");
    }
    if (!deviceIDList || deviceIDList.length < 1) {
        return new Error('start session missing device ID list');
    }
    console.log('session method start')
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
        console.log("getting session")
        axios.post(`https://us-central1-agromation-grow-room-control.cloudfunctions.net/OTService/api/session`, input, reqConfig)
            .then((res) => {

                if (res.status === 200) {
                    console.log("success")
                    console.log(res.data);
                    dispatch({ type: SESSION_START, payload: res.data })
                } else {
                    dispatch({ type: SESSION_ERROR, payload: res.data })
                }

            }).catch((err) => {
                console.log(err);
                dispatch({ type: SESSION_ERROR, payload: err })
            })
    }).catch((err) => {
        console.log(err)
    });

}

export const createLiveDataSubscriptions = (deviceID) => async dispatch => {

}

export const FetchLiveData = (deviceID, live) => async dispatch => {
    if (!deviceID) {
        return new Error('no device id  for FetchliveData Action');
    }
    // console.log('fetching Live data for Room ' + deviceID)
    
    let {data, unsubscribe} = {};
     unsubscribe = db.collection("Rooms").doc(deviceID).collection("Live").doc("LiveData")
    .onSnapshot((doc) => {
        if(doc.exists){
            data = doc.data()
            // console.log(data)
            live[deviceID] = data
            dispatch({ type: FETCH_LIVE, payload: {live, unsubscribe} });
        }else{
            // console.log("doc doesnt exist")
        }
    }, (error) => {
        console.log(error)
    });
}


export const FetchHistoryData = (deviceID, datahistory, rate='30Min') => async dispatch => {
    if(!deviceID){
        return new Error("no device id for FetchHistoryData action")
    }
    if(!datahistory){
        datahistory = {}
    }
    let {data, unsubscribe} = {};
    unsubscribe = db.collection("Rooms").doc(deviceID).collection("History").doc(rate)
    .onSnapshot((doc) => {
        if(doc.exists){
            data = doc.data()
            // console.log(data)
            datahistory[deviceID] = data
            dispatch({ type: FETCH_HISTORY, payload: {datahistory, unsubscribe} });
        }else{
            console.log("h doc doesnt exist")
        }
    }, (error) => {
        console.log(error)
    });
}

export const FetchAlarms = (accountID, currentAlarms, ) => async dispatch => {
    if(!accountID){
        return new Error("no account id for FetchAlarms action")
    }
    if(!currentAlarms){
        currentAlarms = {}
    }
    let {data, unsubscribe} = {};
    let alarmList = [];
    console.log('fetching Alarms')
    unsubscribe = db.collection("Alarms").where('active', '==', true).where('ownerID', '==', accountID)
    .onSnapshot((doc) => {
        doc.forEach((doc)=> {
            if(doc.exists){
                data = doc.data()
                // console.log(data)
                alarmList.push(data)
                
            }else{
                console.log("doc doesnt exist")
            }
        });
        dispatch({ type: FETCH_ALARMS, payload: {alarmList:alarmList, unsubscribe} });
        
    }, (error) => {
        console.log(error)
    });
}
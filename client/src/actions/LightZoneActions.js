import { FETCH_ZONES, PENDING_ZONES } from "./types";
import { db } from "../consts/firebase";
import { exampleLightZoneArray } from "../exampleDataTypes/clientExamlpeDataTypes"

export const pendingZones = () => dispatch => {
    console.log("pending zones")
    dispatch({ type: PENDING_ZONES, payload: true });
}
export const resetPendingZones = () => dispatch => {
    dispatch({ type: PENDING_ZONES, payload: false });
}

export const fetchZones = (room) => async dispatch => {
    //try and get the rooms using the location ID provided
    
    console.log(room);
    if (room !== undefined && room.Zones !== undefined) {
        //when the Owner ID is null us the UID for the user account
        console.log(`querying zones for room for id ${room.name}`)
        let newZoneArray = [];
        room.Zones.forEach((item, index) => {
            item.zoneRef.get().then((doc) => {
                if(doc.exists){
                    newZoneArray.push(doc.data())
                }else{
                    console.log("zone undefined")
                }

            }).catch((err) => {
                console.log(err);
            })
        })
        dispatch({type:FETCH_ZONES, payload:newZoneArray});
        // if(newZoneArray.length === room.Zones.length){
            
        // }

    }

};


export const setExampleZones = () => dispatch => {
    let result = exampleLightZoneArray;
    console.log("dispatching Example room data")
    dispatch({ type: FETCH_ZONES, payload: result })
}
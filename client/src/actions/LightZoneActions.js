import { FETCH_ZONES, PENDING_ZONES } from "./types";
import { db } from "../consts/firebase";
import { exampleLightZoneArray } from "../exampleDataTypes/clientExamlpeDataTypes"

export const pendingZones = () => dispatch => {
    console.log("pending zones")
    dispatch({ type: PENDING_ZONES, payload: true });
}
export const resetPendingZones = () => dispatch => {
    console.log("zones pending reset")
    dispatch({ type: PENDING_ZONES, payload: false });
}
export const resetZones = () => dispatch => {
    console.log("zones reset")
    dispatch({ type: FETCH_ZONES, payload: [] })
}

const getIndividualZone = async (zoneRef) => {
    try{
        let doc = await zoneRef.get();
        return new Promise((resolve,reject) => {
            if (doc.exists) {
                console.log("adding data")
                resolve(doc.data())
            } else {
                console.log("zone undefined")
                reject("document undefined")
            }
        })
    }catch(err){
        throw err
    }
    
}


export const fetchZones = (room) => async dispatch => {
    //try and get the rooms using the location ID provided

    if (room !== undefined && room.Zones !== undefined) {
        //when the Owner ID is null us the UID for the user account
        console.log(`querying zones for room for id ${room.name}`)
        let newZoneArray = [];
        for(let i = 0; i<room.Zones.length; i++){
            try{
                let zone = await getIndividualZone(room.Zones[i].zoneRef)
                newZoneArray.push(zone);
            }catch(err){
                console.log(err);
            }
            
        }
        dispatch({ type: FETCH_ZONES, payload: newZoneArray });
        // if(newZoneArray.length === room.Zones.length){

        // }

    }

};


export const setExampleZones = () => dispatch => {
    let result = exampleLightZoneArray;
    console.log("dispatching Example room data")
    dispatch({ type: FETCH_ZONES, payload: result })
}
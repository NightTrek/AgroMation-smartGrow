import {FETCH_ZONES, PENDING_ZONES } from "./types";
import { db } from "../consts/firebase";
import {exampleLightZoneArray} from "../exampleDataTypes/clientExamlpeDataTypes"


export const fetchZones = (room) => async dispatch => {
    //try and get the rooms using the location ID provided
    if (room !== undefined ) {
        if (!room.example  && room.Zones !== undefined) {
            //when the Owner ID is null us the UID for the user account
            console.log(`querying rooms for id ${User.UID}`)
            db.collection("Rooms").where("ownerID", "==", User.UID)
                .get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        let roomArray = [];
                        querySnapshot.forEach((doc) => {
                            if (doc.exists) {
                                roomArray.push(doc.data());
                                
                            } else {
                                console.log("Error doc OUT OF RANGE")
                            }
                        });

                        dispatch({ type: GET_ROOMS, payload: roomArray })
                    }
                    else {
                        console.log("Nothing found for that User account")
                        // dispatch({ type: FETCH_USER, payload: exampleAccount });
                    }

                }).catch((error) => {
                    console.log(error)
                    // dispatch({ type: FETCH_USER, payload: exampleAccount });
                });
        }
        else {

            //try and Use the Owner ID as the UID
        }
    }

};

export const setExampleZones = () => dispatch => {
    let result = ExampleRoomData;
    console.log("dispatching Example room data")
    dispatch({ type: GET_ROOMS, payload: result })
}

import { GET_ROOMS, SET_ROOM, PENDING_ROOMS } from "./types"
import { ExampleRoomData } from "../exampleDataTypes/clientExamlpeDataTypes";
import { db } from "../consts/firebase";

export const pendingRooms = () => dispatch => {
    dispatch({type: PENDING_ROOMS, payload:true});
}

export const getRooms = (User) => async dispatch => {
    //try and get the rooms using the location ID provided
    if (User !== undefined && User.UID !== undefined) {
        if (User.accountOwner == null && User.UID !== undefined) {
            //when the Owner ID is null us the UID for the user account
            console.log(`querying rooms for id ${User.UID}`)
            db.collection("Rooms").where("ownerID", "==", User.UID)
                .get()
                .then((querySnapshot) => {
                    if (!querySnapshot.empty) {
                        let roomArray = [];
                        querySnapshot.forEach((doc) => {
                            if (doc.exists) {
                                roomArray.push({doc:doc.id, ...doc.data()}
                                    );
                                
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

export const setExampleRooms = () => dispatch => {
    let result = ExampleRoomData;
    console.log("dispatching Example room data")
    dispatch({ type: GET_ROOMS, payload: result })
}

export const setRoom = (formProps) => async dispatch => {
    console.log("dispatching room index")
    dispatch({ type: SET_ROOM, payload: formProps })
};

import {GET_ROOMS, SET_ROOM} from "./types"
import {ExampleRoomData} from "../exampleDataTypes/clientExamlpeDataTypes";
import {db} from "../consts/firebase";


export const getRooms = (User) => async dispatch => {
        console.log(User)
        //try and get the rooms usingthe location ID provided
        if(User !== undefined && User.UID !== undefined || User.example){
            if(User.accountOwner == null){
                //try and use UID to get rooms
                db.collection("Rooms").where("UID", "==", User.UID)
            .get()
            .then((querySnapshot) => {
                if(!querySnapshot.empty){
                    querySnapshot.forEach((doc) => {
                        console.log("inside query")
                        if (doc.exists) {
                            // dispatch({ type: FETCH_USER, payload: doc.data() })
                        } else {
                            console.log("Example user dispatched")
                            // dispatch({ type: FETCH_USER, payload: exampleAccount });
    
                        }
                    });
                }
                else{
                    console.log("Example user dispatched")
                    // dispatch({ type: FETCH_USER, payload: exampleAccount });
                }
                
            }).catch((error) => {
                console.log(error)
                // dispatch({ type: FETCH_USER, payload: exampleAccount });
            });
            }
            else{
                //try and Use the Owner ID as the UID
            }
        }
        
    };

export const setExampleRooms = () => dispatch => {
    let result = ExampleRoomData;
    console.log("dispatching Example room data")
    dispatch({type: GET_ROOMS, payload:result})
}

export const setRoom = (formProps) => async dispatch => {
        console.log("dispatching room index")
        dispatch({type:SET_ROOM, payload: formProps})
    };
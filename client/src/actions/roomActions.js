
import { GET_ROOMS, SET_ROOM, PENDING_ROOMS } from "./types"
import { ExampleRoomData } from "../exampleDataTypes/clientExamlpeDataTypes";
import { db } from "../consts/firebase";

export const pendingRooms = () => dispatch => {
    dispatch({type: PENDING_ROOMS, payload:true});
}

export const resetPendingRooms = () => dispatch => {
    dispatch({type: PENDING_ROOMS, payload:false});
}

export const getRooms = (User, location) => async dispatch => {
    //try and get the rooms using the location ID provided
    if (User !== undefined && User.UID !== undefined) {
        if (User.accountOwner == null && User.UID !== undefined) {
            //when the Owner ID is null us the UID for the user account
            console.log(`querying rooms for id ${User.UID}`)
            let querySnapshot = await db.collection("Rooms").where("ownerID", "==", User.UID).get()
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

                
        }
        else {
            console.log("Using location array to get rooms");
                console.log(User.location)
                console.log(location)
            let querySnapshot = await User.location[location].locationID.get()//.then( async() => {
                if(querySnapshot.exists){
                    console.log(querySnapshot.data())
                    let RoomPerLocationArray = [];
                    for(let i = 0; i < querySnapshot.data().rooms.length; i++){
                        let docSnapshot = await querySnapshot.data().rooms[i].get()
                            if(docSnapshot.exists){
                                RoomPerLocationArray.push({doc:docSnapshot.id, ...docSnapshot.data()})
                            }
                            else{
                                throw "room Reference not found"
                            }
                        
                    }
                    console.log(RoomPerLocationArray);
                    dispatch({type: GET_ROOMS, payload: RoomPerLocationArray})
                }
            // }).catch((error) => {
            //     console.log(error);
            // })
            //Use the users location array to get the Rooms 
            //first it will read each location document in the location array
            //then it will query each room associated in the room array associated with the location document
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
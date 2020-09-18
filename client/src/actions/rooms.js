
import {GET_ROOMS, SET_ROOM} from "./types"
import {ExampleRoomData} from "../exampleDataTypes/clientExamlpeDataTypes";



export const getRooms = (formProps) => async dispatch => {
        //try and get the rooms usingthe location ID provided
        let result = ExampleRoomData;
        console.log("dispatching room data")
        dispatch({type: GET_ROOMS, payload:result})
    };

export const setRoom = (formProps) => async dispatch => {
        console.log("dispatching room index")
        dispatch({type:SET_ROOM, payload: formProps})
    };
import {
    INCREMENT_COUNTER,
    DECREMENT_COUNTER,
    AUTH_USER,
    AUTH_ERROR,
    FETCH_GROWROOMS,
    ADD_GROWROOM,
    GROWROOM_ERROR,
    FETCH_USER,
    SET_LOCATION,
    GET_ROOMS,
    SET_ROOM
} from "./types";
import axios from "axios";
import {
    exampleAccount,
    ExampleRoomData
} from "../exampleDataTypes/clientExamlpeDataTypes.js"

export const incrementCounter = () => {
    return {
        type: INCREMENT_COUNTER
    };
};

export const decrementCounter = () => {
    return {
        type: DECREMENT_COUNTER
    };
};

export const signup = (formProps, callback) => async dispatch => {
    try {
        const res = await axios.post("/api/auth/signup", formProps);
        console.log(res);
        dispatch({type: AUTH_USER, payload: {auth: res.data.token}});
        localStorage.setItem("token", res.data.token);
        callback();
    } catch (e) {
        console.log(e);
        dispatch({type: AUTH_ERROR, payload: "Email in use"});
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const res = await axios.post("/api/auth/signin", formProps);
        dispatch({type: AUTH_USER, payload: res.data.token});
        localStorage.setItem("token", res.data.token);
        callback();
    } catch (e) {
        dispatch({type: AUTH_ERROR, payload: "Invalid login credentials"});
    }
};

export const signout = () => {
    localStorage.removeItem("token");
    return {
        type: AUTH_USER,
        payload: ""
    };
};

export const fetchUser = () => async dispatch => {
    //try Async Post request authenticated dispatch User data
    dispatch({type: FETCH_USER, payload: exampleAccount});
    //or dispatch API error if it doesnt work

};

export const setLocation = (formProps) => async dispatch => {
    //try Async Post request authenticated dispatch User data
    dispatch({type: SET_LOCATION, payload: formProps});
    //or dispatch API error if it doesnt work
    
};

export const getRooms = (formProps) => async dispatch => {
    //try and get the rooms usingthe location ID provided
    let result = ExampleRoomData;
    console.log("dispatching room data")
    dispatch({type: GET_ROOMS, payload:result})
}
export const setRoom = (formProps) => async dispatch => {
    console.log("dispatching room index")
    dispatch({type:SET_ROOM, payload: formProps})
}

export const fetchUserGrowRoomsAndStatus = () => async dispatch => {
    try {
        const response = await axios.post("http://localhost:3001/api/r/getgrowrooms", {}, {
            headers: {authorization: localStorage.getItem("token")}
        });

        dispatch({type: FETCH_GROWROOMS, payload: response.data});
    } catch (e) {
        dispatch({type: GROWROOM_ERROR, payload: "Something bad happened"});
    }
};

export const addGrowRoom = formValue => async dispatch => {
    try {
        await axios.post("/api/todo", {}, {
            headers: {
                authorization: localStorage.getItem("token"),
                serial: formValue
            }
        });

        const todos = await axios.get("/api/todo", {
            headers: {authorization: localStorage.getItem("token")}
        });

        console.log("Testing");

        dispatch({type: ADD_GROWROOM, payload: todos.data.todos});
    } catch (e) {
        dispatch({type: GROWROOM_ERROR, payload: "Something went wrong"});
    }
};

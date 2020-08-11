import {
    INCREMENT_COUNTER,
    DECREMENT_COUNTER,
    AUTH_USER,
    AUTH_ERROR,
    FETCH_GROWROOMS,
    ADD_GROWROOM,
    GROWROOM_ERROR
} from "./types";
import axios from "axios";

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

import { AUTH_USER, AUTH_ERROR } from "./types";
import axios from "axios";


export const signup = (formProps, callback) => async dispatch => {
    try {
        const res = await axios.post("/api/auth/signup", formProps);
        console.log(res);
        dispatch({ type: AUTH_USER, payload: { auth: res.data.token } });
        localStorage.setItem("token", res.data.token);
        callback();
    } catch (e) {
        console.log(e);
        dispatch({ type: AUTH_ERROR, payload: "Email in use" });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const res = await axios.post("/api/auth/signin", formProps);
        dispatch({ type: AUTH_USER, payload: res.data.token });
        localStorage.setItem("token", res.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: "Invalid login credentials" });
    }
};

export const signout = () => {
    localStorage.removeItem("token");
    return {
        type: AUTH_USER,
        payload: ""
    };
}

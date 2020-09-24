import { FETCH_USER, SET_LOCATION, API_ERROR } from "./types";
import { exampleAccount } from "../exampleDataTypes/clientExamlpeDataTypes";
import { db } from "../consts/firebase";

export const fetchUser = (UID) => async dispatch => {
    console.log(UID)
    if(UID !== undefined){
    db.collection("Users").where("UID", "==", UID)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id}`);
                console.log(doc.data())
                dispatch({ type: FETCH_USER, payload: doc.data() })
            });
        }).catch((error) => {
            console.log(error)
            dispatch({ type: FETCH_USER, payload: exampleAccount });
        });
    }
    // else{
    //     dispatch({type: FETCH_USER, payload: exampleAccount});
    // }

};
export const setUser = (User) => async dispatch => {
    console.log('setting User info from read')
    dispatch({ type: FETCH_USER, payload: User });
}

export const setExampleUser = () => async dispatch => {
    console.log("setting example User")
    dispatch({ type: FETCH_USER, payload: exampleAccount });
}


export const setLocation = (formProps) => async dispatch => {
    //try Async Post request authenticated dispatch User data
    dispatch({ type: SET_LOCATION, payload: formProps });
    //or dispatch API error if it doesnt work

}
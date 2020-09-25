import { FETCH_USER, SET_LOCATION, FETCH_USER_PENDING } from "./types";
import { exampleAccount } from "../exampleDataTypes/clientExamlpeDataTypes";
import { db } from "../consts/firebase";

export const fetchUserPending = (user) => dispatch => {

    dispatch({type: FETCH_USER_PENDING, payload: true})
   
}

export const fetchUser = (UID) => async dispatch => {
    console.log(`Fetching User ${UID}`)
    if (UID !== undefined) {
        db.collection("Users").where("UID", "==", UID)
            .get()
            .then((querySnapshot) => {
                if(!querySnapshot.empty){
                    querySnapshot.forEach((doc) => {
                        if (doc.exists) {
                            // console.log("user dispatched")
                            dispatch({ type: FETCH_USER, payload: doc.data() })
                        } else {
                            console.log("Example user dispatched")
                            dispatch({ type: FETCH_USER, payload: exampleAccount });
    
                        }
                    });
                }
                else{
                    console.log("Example user dispatched")
                    dispatch({ type: FETCH_USER, payload: exampleAccount });
                }
                
            }).catch((error) => {
                console.log(error)
                dispatch({ type: FETCH_USER, payload: exampleAccount });
            });
    }
    else{
        console.log("UID undefined")
        // dispatch({type: FETCH_USER, payload: exampleAccount});
    }

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
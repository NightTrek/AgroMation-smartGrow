import {FETCH_USER, SET_LOCATION} from "./types";
import {exampleAccount} from "../exampleDataTypes/clientExamlpeDataTypes";


export const fetchUser = () => async dispatch => {
        //try Async Post request authenticated dispatch User data
        dispatch({type: FETCH_USER, payload: exampleAccount});
        //or dispatch API error if it doesnt work
    
    };
    
export const setLocation = (formProps) => async dispatch => {
        //try Async Post request authenticated dispatch User data
        dispatch({type: SET_LOCATION, payload: formProps});
        //or dispatch API error if it doesnt work
        
    }
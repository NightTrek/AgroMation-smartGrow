import * as C from "../constants";

import firebase from "../consts/firebase";
import { AUTH_ERROR, AUTH_USER } from "./types";

export const signUpWithEmailPass = (formProps) => async dispatch => {

    firebase.auth().createUserWithEmailAndPassword(formProps.email, formProps.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({type:AUTH_ERROR, payload: `AUTH error |${errorCode}|${errorMessage}`})
      });
};


export const attemptSigninEmailpass = (formProps, callback) => async dispatch => {
    firebase.auth().signInWithEmailAndPassword(formProps.email, formProps.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({type:AUTH_ERROR, payload: `AUTH error |${errorCode}|${errorMessage}`})
      });
}

export const startListeningToAuth = () => async dispatch => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
          dispatch({type:AUTH_USER, payload: user})
        } else {
          // User is signed out.
          // ...
          dispatch({type:AUTH_USER, payload: ``})
        }
      });
};


export const firebaseSignOut = () => async dispatch => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        dispatch({type:AUTH_USER, payload: ``})
      }).catch(function(error) {
        // An error happened.
        dispatch({type:AUTH_ERROR, payload: `error during signout ${error}`})
      });
}
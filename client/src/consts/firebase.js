import * as firebase from "firebase/app";
import "firebase/auth";


var firebaseConfig = {
    apiKey: "AIzaSyB7Lf_Vw274eDIuRglY27TpilSSK0SOpak",
    authDomain: "agromation-grow-room-control.firebaseapp.com",
    databaseURL: "https://agromation-grow-room-control.firebaseio.com",
    projectId: "agromation-grow-room-control",
    storageBucket: "agromation-grow-room-control.appspot.com",
    messagingSenderId: "502508358693",
    appId: "1:502508358693:web:a4329660738695d0d3c3cc",
    measurementId: "G-J8H7FDRCCL"
  };
  // Initialize Firebase
  
 

  const app = firebase.initializeApp(firebaseConfig);
  // firebase.analytics();


  export default app;
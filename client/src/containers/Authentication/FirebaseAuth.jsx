import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

//component import
import firebase from "../../consts/firebase";
import * as firebaseUI from "firebaseui";
//import css




let ui = new firebaseUI.auth.AuthUI(firebase.auth())


class FirebaseAuth extends Component {


  componentDidMount(){
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        {
          provider: firebase.firebase_.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true
        }
      ]
    });
  }
    
    render(){
    return (
      <div id={'#firebaseui-auth-container'}>

      </div>
    )
    }
}

function mapStateToProps(state) {
  return { state };
}

export default compose(connect(mapStateToProps, {}))(FirebaseAuth);


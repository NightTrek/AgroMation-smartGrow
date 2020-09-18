import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

//component import
import Dashboard from "../../containers/dashboard2/Dashboard2";
//old auth
import Auth from "../../containers/Authentication";
//new Auth
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "../../consts/firebase";

//import css
import "./index.css";
// import FirebaseAuth from "../../containers/Authentication/FirebaseAuth"


// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  // signInSuccessUrl: '/Dashboard',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.firebase_.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};


class Welcome extends Component {

  state = {
    isSignedIn: false
  }

  // Listen to the Firebase Auth state and set the local state.
  // also checks for authstate
  componentDidMount() {
    let userCheck = this.props.state.auth.authenticated;
    if (userCheck !== "" && userCheck !== null) {
      this.props.history.push('dashboard')
    }
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user })
    );
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }
    render() {
      if(this.state.isSignedIn){
        return(<Dashboard/>)
      }
      return (
        <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

          {/* <Auth history={this.props.history}></Auth> */}
        </div>
      )
    }
  
}

function mapStateToProps(state) {
  return { state };
}

export default compose(connect(mapStateToProps, {}))(Welcome);


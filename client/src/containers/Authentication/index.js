import React, { Component } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import { compose } from "redux";
import { connect } from "react-redux";

import agroLogo from  "./../../img/AgroMationLogosquare512.png"

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btn: true
    };

    this.renderSignin = this.renderSignin.bind(this);
    this.renderSignup = this.renderSignup.bind(this);
  }

  renderSignup() {
    this.setState({ btn: false });
    console.log(this.state);
  }

  renderSignin() {
    this.setState({ btn: true });
    console.log(this.state);
  }

  render() {
    return (
      <div className="modal-block col-sm-12 col-md-8 col-lg-6 col-xl-4">
        <img
          className="imgSize"
          src={agroLogo}
          alt={"AgroMation logo"}
        />
        <div className="modal-block-content">
          {/* <button id="stylingButton" className="btn btn-primary"></button> */}
          {/* this one is not rly a button ^ it's to fill empty space*/}
          <button
            id="loginButton"
            className="btn btn-primary"
            onClick={this.renderSignin}
          >
            SIGNIN
          </button>
          <button
            id="signupButton"
            className="btn btn-primary"
            onClick={this.renderSignup}
          >
            SIGNUP
          </button>

          {this.state.btn ? <Signin history={this.props.history}/> : <Signup history={this.props.history} />}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default compose(
  connect(
    mapStateToProps,
    {}
  )
)(Auth);

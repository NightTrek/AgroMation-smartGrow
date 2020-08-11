import React, { Component } from "react";
import UserSettings from "./UserSettings";
import growRoomSettings from "./growRoomSettings";
import { compose } from "redux";
import { connect } from "react-redux";

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btn: true
    };

    this.renderUserSettings = this.renderUserSettings.bind(this);
    this.renderChillerSettings = this.renderChillerSettings.bind(this);
  }

  renderChillerSettings() {
    this.setState({ btn: false });
    console.log(this.state);
  }

  renderUserSettings() {
    this.setState({ btn: true });
    console.log(this.state);
  }

  render() {
    return (
      <div className="page">
        <div className="modal-block col-sm-12 col-md-8 col-lg-6 col-xl-4">
          <img
            className="imgSize opacity"
            src={
              "https://perma.cool/wp-content/uploads/2019/03/site-icon-1.png"
            }
            alt={"Perma.Cool logo"}
          />
          <div className="modal-block-content">
            {/* <button
              id="stylingButton"
              className="btn btn-primary text-right"
            ></button> */}
            {/* this one is not rly a button ^ it's to fill empty space*/}
            <button
              id="loginButton"
              className="btn btn-primary"
              onClick={this.renderUserSettings}
            >
              USER
            </button>
            <button
              id="signupButton"
              className="btn btn-primary"
              onClick={this.renderChillerSettings}
            >
              CHILLER
            </button>

            {this.state.btn ? <UserSettings /> : <growRoomSettings />}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default compose(connect(mapStateToProps, {}))(Settings);

import React, { Component } from "react";
import UserSettings from "./UserSettings";
import { compose } from "redux";
import { connect } from "react-redux";
import requireAuth from "../../hoc/requireAuth";
import agroLogo from  "./../../img/AgroMationLogosquare512.png"
const exampleData = {
  userName:"Daniels",
  email:"Daniel@daniel.com",
  password:"********iel"
};

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btn: true
    };

    this.renderUserSettings = this.renderUserSettings.bind(this);
  }


  renderUserSettings() {
    this.setState({ btn: true });
    console.log(this.state);
  }

  render() {
    return (
      <div className="page">
        <div className="modal-block col-sm-12 col-md-8 col-lg-6 col-xl-4">
        <button
              id="Users"
              className="btn btn-primary"
              onClick={this.renderUserSettings}
            >
              USER
            </button>
          <img
            className="imgSize opacity"
            src={
              agroLogo
            }
            alt={"AgroMation logo"}
          />
          <div className="modal-block-content">
            {/* <button
              id="stylingButton"
              className="btn btn-primary text-right"
            ></button> */}
            {/* this one is not rly a button ^ it's to fill empty space*/}
            

            <UserSettings CurrentUserName={exampleData.userName} CurrentEmail={exampleData.email} CurrentPass={exampleData.password}/> 
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

// export default compose(connect(mapStateToProps, {}))(Settings);




const formedComponent = compose(connect(mapStateToProps, {}))(Settings);


export default requireAuth(formedComponent);
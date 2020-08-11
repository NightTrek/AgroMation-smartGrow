import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";

//component import
import Auth from "../../containers/Authentication";

//import css
import "./index.css";

class Welcome extends Component {
  state = {
    userCheck: false
  };

  componentDidMount() {
    this.checkIfAuth()
  }

  checkIfAuth(){
    console.log(this.state);
    let userCheck = this.props.state.auth.authenticated;
    if (userCheck !== "" && userCheck !== null) {
      this.props.history.push('dashboard')
    }
  }

  render() {
    return (
      <div className="page">
         <Auth history={this.props.history}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default compose(connect(mapStateToProps, {}))(Welcome);

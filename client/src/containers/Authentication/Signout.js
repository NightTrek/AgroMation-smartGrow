import React, { Component } from "react";
import { firebaseSignOut } from "../../actions/auth";
import { connect } from "react-redux";

class Signout extends Component {
  componentDidMount() {
    this.props.firebaseSignOut();
    this.props.history.push("/");
  }

  render() {
    return <h1>Sorry to see you go</h1>;
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, { firebaseSignOut })(Signout);

import React, { Component } from "react";
import { signout } from "../../actions";
import { connect } from "react-redux";

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
    this.props.history.push("/");
  }

  render() {
    return <h1>Sorry to see you go</h1>;
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, { signout })(Signout);

import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import "./SideDrawer.css";

class SideDrawer extends Component {
  state = {
    userCheck: false
  };

  componentDidMount() {
    console.log(this.state);
    let userCheck = this.props.state.auth.authenticated;
    if (userCheck !== "" && userCheck !== null) {
      this.setState({
        userCheck: true
      });
    } else {
      this.setState({
        userCheck: false
      });
    }
  }
  render() {
    let drawerClasses = "side-drawer";
    if (this.props.show) {
      drawerClasses = "side-drawer open";
    }
    return (
      <nav className={drawerClasses}>
        {/* <ul>
          <Userinfo userData={props.userData} />
          <li> USER NAME</li>
          <li>
            <a href="/">CHILLA</a>
          </li>
          <li>
            <a href="/">CHILLA</a>
          </li>
          <li>
            <a href="/">CHILLA</a>
          </li>
          <li>
            <NavLinks />
          </li>
        </ul> */}
        {this.state.userCheck ? (
          <ul>
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/signout">Sign Out</a>
            </li>
            {/* <li>
              <NavLinks />
            </li> */}
          </ul>
        ) : (
          <ul>
            <h5>
              Please sign in to <br></br>
              access your app
            </h5>
          </ul>
        )}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default compose(connect(mapStateToProps, {}))(SideDrawer);

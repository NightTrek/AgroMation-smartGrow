import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Toolbar from './Partials/Toolbar';
import SideDrawer from './Partials/SideDrawer/SideDrawer';
import Backdrop from './Backdrop/Backdrop';
// import "./Welcome.css";
import * as actions from "../actions";

class NavBarHeader extends Component {
    constructor(props){
        super(props);
        this.state = {
            sideDrawerOpen: false,
            auth:null

        };
    }


  componentDidUpdate(prevProps, prevState, snapshot) {
      this.mapUserInfoToState(prevProps,prevState);
  }

    mapUserInfoToState(props, prevState){
      // console.log(prevState.auth);
      if(prevState.auth !== null && props.auth.data){
          console.log("maping auth to state");
          let currentState = this.state;
          currentState.auth = props.auth.data[0];
          this.setState(currentState);
      }

  }

drawerToggleClickHandler = (props) => {
    let currentState = this.state;
    currentState.sideDrawerOpen = !this.state.sideDrawerOpen;
    this.setState(currentState);
};

backdropClickHandler =() => {
    this.setState({sideDrawerOpen: false});
};

render() {
    let backdrop;

    if (this.state.sideDrawerOpen) {
        backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }
    // console.log(this.props);
    return(
      <div style={{height: '100%'}} className={"color-agro-grey"}>
      <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
      <SideDrawer show={this.state.sideDrawerOpen} userData={this.state.auth}/>
      {backdrop}
      </div>
        );
    }
}

function mapStateToProps(state){
    return { auth: state.auth.authenticated }
}

export default connect(mapStateToProps, actions)(NavBarHeader);
// export default NavBarHeader;

import React from "react";
import { Route, Redirect } from "react-router-dom";
import {  useSelector, shallowEqual } from "react-redux";
import {getCustomClaimRole} from '../../consts/firebase';



function PrivateRoute({ component: Component, ...rest }) {
    let { Auth } = useSelector(state => ({
        Auth: state.auth.authenticated,
    }), shallowEqual)
    let isAuthenticated = false;
    if(Auth !== undefined && Auth !== "" ){
      if(Auth.stripeRole==="premium" || Auth.stripeRole==="business"){
        isAuthenticated=true
      }   
    }
    
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Settings" />
        )
      }
    />
  );
}

export default PrivateRoute;
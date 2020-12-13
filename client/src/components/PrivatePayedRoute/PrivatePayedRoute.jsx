import React from "react";
import { Route, Redirect } from "react-router-dom";
import {  useSelector, shallowEqual } from "react-redux";



function PrivatePayedRoute({ component: Component, ...rest }) {
    let { Auth } = useSelector(state => ({
        Auth: state.auth.authenticated,
    }), shallowEqual)
    let isAuthenticated = false;
    console.log(rest);
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

export default PrivatePayedRoute;
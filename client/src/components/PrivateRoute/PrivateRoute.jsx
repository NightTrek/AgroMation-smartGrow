import React from "react";
import { Route, Redirect } from "react-router-dom";
import {  useSelector, shallowEqual } from "react-redux";



function PrivateRoute({ component: Component, ...rest }) {
    let { Auth } = useSelector(state => ({
        Auth: state.auth.authenticated,
    }), shallowEqual)
    let isAuthenticated = false;
    if(Auth !== undefined && Auth !== ""){
        isAuthenticated=true
    }
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;
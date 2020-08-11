import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";


// Import Containers
import App from "./containers/App";
// import Signup from "./containers/Authentication/Signup";
// import Signin from "./containers/Authentication/Signin";
import Signout from "./containers/Authentication/Signout";
import Dashboard2 from './containers/dashboard2/Dashboard2';

import Wrapper from "./containers/Wrapper";

import TempChart from "./containers/TempChart/TempChart";
import './style.css';


// Import components
import Settings from "./components/Settings";
// import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";

import reducers from "./reducers";

// configure redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem("token") }
  },
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Wrapper>
        <App>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/dashboard" component={Dashboard2} />
          <Route exact path="/settings" component={Settings} />
          {/* <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} /> */}
          <Route exact path="/signout" component={Signout} />
          <Route exact path="/chart" component={TempChart} />
        </App>
      </Wrapper>
    </Router>
  </Provider>,
  document.getElementById("root")
);
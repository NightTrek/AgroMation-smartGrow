import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import '@stripe/stripe-js';

// Import Containers
import Navbar from "./containers/NavBar/Navbar";
// import Signup from "./containers/Authentication/Signup";
// import Signin from "./containers/Authentication/Signin";
import Signout from "./containers/Authentication/Signout";
import Dashboard2 from './containers/dashboard2/Dashboard2';
import Wrapper from "./containers/Wrapper";
// Import components
import Settings from "./components/Settings";
// import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import IndividualRoom from "./containers/IndividualRoom/IndividualRoom";
import UsersPage from "./containers/UsersPage/UsersPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PrivatePayedRoute from "./components/PrivatePayedRoute/PrivatePayedRoute";
import SubscriptionChoicePage from "./containers/SubscriptionChoicePage/SubsciptionChoicePage";
import PaymentDetailsPage from "./containers/PaymentDetailsPage/PaymentDetailsPage";
import AdminPage from './containers/AdminPage/AdminPage';

import './style.css';

import reducers from "./reducers";
import { startListeningToAuth } from "./actions/auth"

// configure redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let token = "";
if(localStorage.getItem("token") !== undefined){
  try{
    token = JSON.parse(localStorage.getItem("token"));
  }catch(error){
    token = ""
  }
}
const store = createStore(
  reducers,
  {
    auth: { authenticated: token }
  },
  composeEnhancers(applyMiddleware(reduxThunk))
);

//Make the Navbar display different links depending on your auth Claim
//HandleRevokingmangedAccountsBasedOn the primary accounts subscription
//handleGivingManagedAccountsTheStripeRole Auth Claim.
//make the SubscribePage Work without being logged in by directing the User To login. to purchase an account.
// Terms of use Page no content
// Privacy Policy Page no content
//Admin Page 
//Add a report a bug system in the settings page

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Wrapper>
        <Navbar>
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route exact path="/signout" component={Signout} />
            <PrivatePayedRoute exact path="/Dashboard" component={Dashboard2} premium business/>
            <PrivatePayedRoute exact path="/Rooms" component={IndividualRoom} premium business/>
            <PrivateRoute exact path="/Settings" component={Settings} />
            <Route exact path="/Subscribe" component={SubscriptionChoicePage} />
            <PrivateRoute exact path="/secure/payment" component={PaymentDetailsPage} />
            {/* <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} /> */}
            <PrivatePayedRoute exact path="/Users" component={UsersPage} premium business/>
            <Route exact path="/Agro/Admin" component={AdminPage} Admin />
            <Route component={Welcome} />
          </Switch>
        </Navbar>
      </Wrapper>
    </Router>
  </Provider>,
  document.getElementById("root")
);


// setup Firebase listeners
setTimeout(function(){
	store.dispatch( startListeningToAuth() );
	// store.dispatch( actions.startListeningToQuotes() );
});
import React, { useEffect, useState } from "react";

import { compose } from "redux";
import { connect, useSelector, shallowEqual } from "react-redux";

// import agroLogo from "./../../img/AgroMationLogosquare512.png"
import { makeStyles, Container, Grid, Typography, Snackbar, Button, List, ListItem } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import moment from "moment";
//User imports
import { EditUserInput, EditUserButton, validateEmail, validatePhone } from "../../containers/UsersPage/UsersPage";
import { setUser } from "../../actions/User"
import { fetchManagedUsers } from "../../actions/ManageUsersActions";
import {UpdateClaimsInAuthState} from "../../actions/auth";
//firebase
import { createPortalLink, db, auth } from "../../consts/firebase"; //getCustomClaimRole




const useStyles = makeStyles((theme) => ({
  settingsWidget: {
    backgroundImage: ` url("https://cdn.discordapp.com/attachments/370759274621698048/755271571181928459/unknown.png")`,
    backgroundRepeat: "repeat-x",
    backgroundColor: theme.palette.secondary.main,
    width: "100%",
    minHeight: "512px",
    padding: "24px",
    color: "white",
  },
  SubContainer: {
    background: theme.palette.secondary.vdark,
    minHeight: "128px",
    borderRadius: '4px',
    marginBottom: "12px",
    marginTop: "12px",

  }

}));


/// card number that always works  4242424242424242
/// card number that fails for  "insufficient_funds"   || 4000000000009995
///TODO Handle first time customers 
//TODO test paying for the first time.
//TODO test upgrading to annual.
//TODO test upgrading business.
//TODO handle payment ERRORS
const Settings = (props) => {
  const classes = useStyles();
  let { user, managedUsers, Auth } = useSelector(state => ({
    user: state.users.user,
    managedUsers: state.managedUsers,
    Auth: state.auth.authenticated


  }), shallowEqual);

  //check if data has loaded and if not display loading text
  if (user.firstName === undefined || user.location.length === undefined) {
    // console.log("settings loading data")
    user = {
      firstName: "loading",
      lastName: "loading",
      email: "loading",
      phone: "set phone",
      subscription: { status: null },
      location: [
        {
          name: "loading",
          address: "Loading Address"
        },
        {
          name: "loading locations",
          address: "loading address"
        },

      ]
    };
    managedUsers = {
      user: []
    }
  }
  //if the user has not set a phone set the phone to say that
  if (!user.phone) {
    user.phone = "Set phone"
  }


  let accountType = "Free";
  let accountInterval = "month";
  let accountBillDue = "$ 50.00";
  let accountBillDueDate = "";
  let accountUsedSeats = "1/1";
  let accountStatus = "Trailing";

  if (user.accountType === "Owner" && user.subscription.status) {
    accountType = user.subscription.role[0].toUpperCase() + user.subscription.role.substring(1);
    accountInterval = user.subscription.interval + "ly Account";
    accountBillDue = "$ " + user.subscription.unitCost / 100;
    let dueDateObj = moment.unix(user.subscription.current_period_end.seconds);
    accountBillDueDate = dueDateObj.format('MMMM, Do, YYYY');
    accountStatus = user.subscription.status[0].toUpperCase() + user.subscription.status.substring(1);
    switch (user.subscription.role) {
      case "premium":
        accountUsedSeats = managedUsers.user.length + " / 5";
        break;
      case "business":
        accountUsedSeats = managedUsers.user.length + " / 10";
        break;
      default:
        console.log("free account handle managed users")
        break;
    }
  }


  // console.log(getCustomClaimRole());

  const [state, setState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  })


  //effect pattern to update state with new values  when they arrive
  useEffect(() => {
    if (user.accountOwner === null && managedUsers.user.length === 0) {
      props.fetchManagedUsers(user.UID);
    }
    if (state.firstName === "loading" && user.firstName !== "loading") {
      setState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        errorMsg: "",
        alertType: "error",
        invalidAlert: false,
      })
    }
    if(user.subscription && user.subscription.status){
      if(user.subscription.status === "trailing" || user.subscription.status === "premium" || user.subscription.status === "business"){
        if(Auth.stripeRole === null){
          props.UpdateClaimsInAuthState(Auth);
        }
      }
    }
    
  }, [user, managedUsers.user, state.firstName, Auth, props])


  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  //snackbar alert system
  const handleAlertOpen = (msg, type) => {
    if (type === "success") {
      console.log("successAlert")
      setState({
        ...state,
        errorMsg: msg,
        invalidAlert: true,
        alertType: "success"
      });
    } else {
      console.log("error alert")
      setState({
        ...state,
        errorMsg: msg,
        invalidAlert: true,
        alertType: "error"
      });
    }

  };

  const handleAlertClose = () => {
    setState({
      ...state,
      invalidAlert: false
    });
  };

  const sendPasswordResetEmail = () => {
    auth.sendPasswordResetEmail(user.email).then(function () {
      // Email sent.
      handleAlertOpen("Successfully sent password reset email", "success");
    }).catch(function (error) {
      // An error happened.
      console.log(error)
      handleAlertOpen("Error something went wrong");
    });
  }

  const saveSettings = async () => {
    //verify there are changes to save
    if (user.firstName === state.firstName && user.lastName === state.lastName && user.email === state.email && user.phone === state.phone) {
      handleAlertOpen("No changes detected");
      return 0;
    }
    if (state.firstName.length < 3 || typeof state.firstName !== "string") {
      handleAlertOpen("First name is invalid or blank");
      return 0;
    }
    if (state.lastName.length < 3 || typeof state.lastName !== "string") {
      handleAlertOpen("last name is invalid or blank");
      return 0;
    }
    //validate email
    if (typeof state.email !== "string" || !validateEmail(state.email)) {
      handleAlertOpen("Email invalid or blank");
      return 0;
    }
    //validate phone
    if (!validatePhone(state.phone) || state.phone === "Set phone") {
      handleAlertOpen("Please add a valid 10 digit phone number no special characters or spaces");
      return 0;
    }

    const UserRef = db.collection("Users").doc(user.doc)

    db.runTransaction((transaction) => {
      return transaction.get(UserRef).then((UserDocSnapshot) => {
        if (!UserDocSnapshot.exists) {
          throw new Error("Document does not exist")
        }
        let data = UserDocSnapshot.data();
        //maybe check and see if the document needs to be updated
        if (data.firstName === state.firstName && data.lastName === state.lastName && data.email === state.email && data.phone === state.phone) {
          return { doc: UserDocSnapshot.id, ...data };
        }
        //do the update and return output

        let output = {
          ...data,
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          phone: state.phone,
        };


        transaction.update(UserRef, output);
        output.doc = user.doc;
        return output;

      }).then((data) => {

        props.setUser(data);
        handleAlertOpen("Successfully updated User data", "success");
      }).catch((err) => {
        handleAlertOpen("error during transaction");
        console.log(err);
      })
    })


  }

  const upgradePlan = () => {
    console.log(user.subscription.status);
    if (user.subscription.status !== "active") {
      props.history.push({
        pathname: "/Subscribe",
        state: { PaymentType: "monthly" }
      })
    }else{
      createPortalLink();
    }

  }

  const EditBillingInfo = async () => {
    createPortalLink();
  }

  return (
    <Container className={"containerMain"}>
      <Grid item container direction={"row"} className={classes.settingsWidget} spacing={2}>
        <Grid item xs={12} >
          <Typography variant={"h5"}>Settings</Typography>
        </Grid>

        {/* <Grid item xs={12}>
          <Divider />
        </Grid> */}
        <Grid item xs={12} sm={6}>
          <EditUserInput label={"First Name"} name={"firstName"} value={state.firstName} inputProps={{ 'aria-label': 'input first name' }} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EditUserInput label={"Last Name"} name={"lastName"} value={state.lastName} inputProps={{ 'aria-label': 'input last name' }} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EditUserInput label={"User Email"} name={"email"} value={state.email} inputProps={{ 'aria-label': 'input email' }} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EditUserInput label={"User Phone"} name={"phone"} value={state.phone} inputProps={{ 'aria-label': 'input phone' }} onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <EditUserButton color={"primary"} onClick={sendPasswordResetEmail} >
            Send Password Reset
          </EditUserButton>
        </Grid>
        <Grid item xs={12} sm={6}>

        </Grid>
        {user.accountType === "Owner" ? (<Grid item container xs={12} className={classes.SubContainer} spacing={3}>
          <Grid item xs={12} >
            <Typography variant={'h5'}>
              Subscription
              </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <List>
              <ListItem>
                <Typography variant={'body2'}>
                  {"Account Type"}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant={'h6'}>
                  {accountType}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant={'body2'}>
                  {accountInterval}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography variant={'h6'}>
                  {accountStatus}
                </Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <List>
              <ListItem>
                <Typography variant={"body2"}> Next Bill Due</Typography>
              </ListItem>
              <ListItem>
                <Typography variant={"h6"}>{accountBillDue}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant={"body2"}> Next Bill Due</Typography>
              </ListItem>
              <ListItem>
                <Typography variant={"subtitle1"}>{accountBillDueDate}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <List>
              <ListItem>
                <Typography variant={"body2"}>Account seats</Typography>
              </ListItem>
              <ListItem>
                <Typography variant={"h6"}>{accountUsedSeats}</Typography>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={8} md={10}>
            <Button variant={"outlined"} color={"primary"} onClick={upgradePlan}>
              Upgrade plan
            </Button>
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button variant={"outlined"} color={"primary"} onClick={EditBillingInfo}>
              Edit Billing info
            </Button>
          </Grid>
        </Grid>) : (<Grid item xs={12}> </Grid>)}

        <Grid item xs={12} sm={8} md={10}>

        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Button variant={"outlined"} color={"primary"} onClick={saveSettings}>
            Save Settings
            </Button>
        </Grid>
      </Grid>
      <Snackbar open={state.invalidAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity={state.alertType}>
          {state.errorMsg}
        </Alert>
      </Snackbar>
    </Container>
  );
}

function mapStateToProps(state) {
  return { state };
}


const formedComponent = compose(connect(mapStateToProps, { setUser: setUser, fetchManagedUsers: fetchManagedUsers, UpdateClaimsInAuthState:UpdateClaimsInAuthState }))(Settings);


export default formedComponent;
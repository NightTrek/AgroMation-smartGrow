import React, { useEffect, useState } from "react";
import app from "./consts/firebase.js";
export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    });
  }, []);
  if (pending) {
    return <>Please wait...</>
  }
  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};





<Grid item container direction={"column"} className={classes.sliderRow}>

<Grid item container direction={'row'}>
    <Grid item container direction={"row"} xs={6} sm={12} style={{ padding: "6px", marginBottom: "24px" }}>
        <Grid item> <h4>Security</h4></Grid>
        <Grid item xs> </Grid>
    </Grid>
    <Grid item xs={6} sm={6}>
        <StandardRoundSelectForm className={classes.formControl} hiddenLabel>
            <Select
                value={pick}
                onChange={handleChange}
                inputProps={{
                    name: 'pick',
                    id: 'AccountType',
                }}
                defaultValue={2}
            >
                {accountType.map((Item, Index) => (
                    <MenuItem key={Index} value={Index}>{Item}</MenuItem>
                ))}
            </Select>
        </StandardRoundSelectForm>
    </Grid>
    <Grid item xs={12} sm={6} style={{ paddingBottom: "12px", paddingRight: "12px" }}>
        <EditUserButton color={"primary"} onClick={sendPasswordResetEmail} >
            Send Password Reset email
            </EditUserButton>
    </Grid>
    <Grid item container xs={12}>
        <div style={{ minHeight: '300px', minWidth: '200px', width: "98%" }} className="ag-theme-alpine-dark" >
            <AgGridReact
                rowData={props.location}
                rowSelection="multiple"
                rowMultiSelectWithClick={true}
                animateRows={true}
                defaultColDef={{
                    flex: 1,
                    minWidth: 128,
                    sortable: true,
                    filter: true,
                }}
                // 
                onGridReady={onGridReady}>

                <AgGridColumn field="name" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                <AgGridColumn field="address" sortable={true}></AgGridColumn>

            </AgGridReact>
        </div>
    </Grid>
    <Grid item container direction={"row"} xs={12}>
        <Grid item xs></Grid>
        <Grid item xs={12} sm={6} style={{ paddingBottom: "24px", paddingTop: "24px" }}>
            <Button variant={"outlined"} color={"primary"} onClick={updateManagedUser}>
                SAVE USER DETAILS
            </Button>
        </Grid>
    </Grid>
</Grid>

</Grid>



db.collection("Users").where("email", "==", lowerCaseEmail).get().then((UsersSnapshot) => {
  if (UsersSnapshot.empty) {
      console.log(output);
      //Here we are going to either create the auth account or get the UID  for the auth account. We are also going to set the Auth claims for said account 

      FetchUidByEmail({ email: output.email }).then(async (auth) => {
          console.log(auth)
          if (auth.uid) {
              output.UID = auth.uid
              //here we set the new users auth claim a
              try {
                  await SetManagedAccountClaims({ uid: auth.uid, accountType: output.accountType.toLowerCase() })
              } catch (err) {
                  console.log("error setting accounts auth claims")
                  console.log(err)
              }
              db.collection('Users').add(output).then((response) => {
                  console.log(response)
                  if (response.id !== undefined) {

                      let newReduxManagedLocationsArray = managedUsers
                      newReduxManagedLocationsArray.push({ doc: response.id, ...output })
                      props.setManagedUsers(newReduxManagedLocationsArray);
                      auth.sendPasswordResetEmail(output.email).then(function () {
                          // Email sent.
                          handleInvalidAlertOpen("Success added User they can now login and access your data", 'success')
                      }).catch(function (error) {
                          // An error happened.

                          handleInvalidAlertOpen("Error sending password to new user");
                      });
                      setOpen(false);
                  } else {
                      handleInvalidAlertOpen("failed to add User Server error please wait and try again.")
                  }
              }).catch((error) => {
                  console.log(error)
                  handleInvalidAlertOpen(`ERROR failed to upload new User please wait and try again`)
              })


          } else {
              //Here we create the account since one does not exist
              CreateMangedAccount({ email: output.email }).then(async (auth) => {
                  if (auth.uid) {
                      output.UID = auth.uid
                      //here we set the new users auth claim a
                      try {
                          await SetManagedAccountClaims({ uid: auth.uid, accountType: output.accountType.toLowerCase() })
                      } catch (err) {
                          console.log(err)
                      }
                      db.collection('Users').add(output).then((response) => {
                          console.log(response)
                          if (response.id !== undefined) {

                              let newReduxManagedLocationsArray = managedUsers
                              newReduxManagedLocationsArray.push({ doc: response.id, ...output })
                              props.setManagedUsers(newReduxManagedLocationsArray);
                              auth.sendPasswordResetEmail(output.email).then(function () {
                                  // Email sent.
                                  handleInvalidAlertOpen("Success added User they can now login and access your data", 'success')
                              }).catch(function (error) {
                                  // An error happened.

                                  handleInvalidAlertOpen("Error sending password to new user");
                              });
                              setOpen(false);
                          } else {
                              handleInvalidAlertOpen("failed to add User Server error please wait and try again.")
                          }
                      }).catch((error) => {
                          console.log(error)
                          handleInvalidAlertOpen(`ERROR failed to upload new User please wait and try again`)
                      })


                  } else {
                      throw new Error("auth error")
                  }

              }).catch((err) => {
                  console.log(err)
                  handleInvalidAlertOpen("failed to add User Server error please wait and try again.")
              });
          }

      }).catch((err) => {
          console.log(err)
          handleInvalidAlertOpen(`ERROR failed to fetch users id`)
      })
  } else {
      handleInvalidAlertOpen(`ERROR email already in use`)
  }
}).catch((error) => {
  handleInvalidAlertOpen(`ERROR failed to upload new User please wait and try again`)
})
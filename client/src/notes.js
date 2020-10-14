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
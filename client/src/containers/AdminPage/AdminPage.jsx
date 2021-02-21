import React, { useEffect, useState } from "react";

import { compose } from "redux";
import { connect, useSelector, shallowEqual } from "react-redux";

// import agroLogo from "./../../img/AgroMationLogosquare512.png"
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'; //
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import {
    makeStyles, Container, Grid, Typography, Snackbar, Button, List, ListItem,
    withStyles, Tab, AppBar, Tabs
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import moment from "moment";
import axios from "axios";
//User imports
import { setUser } from "../../actions/User"
import { fetchAdminUsers, pendingManagedUsers } from "../../actions/ManageUsersActions";
//firebase
import { db, auth, getIdToken, func } from "../../consts/firebase"; //getCustomClaimRole
import { startLiveDataSession, getAuthContext, pingOTSessionService } from "../../CloudFunctions/CloudFunctions";

const ManageAllUsersTable = (props) => {



    return (
        <Grid item container direction={'row'}>
            <Grid item container xs={12} direction={'row'} className={props.classes.agGridContainer}>
                <div className={`${props.classes.agGrid} ag-theme-alpine-dark`}>
                    <AgGridReact
                        rowData={props.managedUsers}
                        rowSelection="multiple"
                        rowMultiSelectWithClick={true}
                        animateRows={true}
                        defaultColDef={{
                            flex: 1,
                            minWidth: 150,
                            sortable: true,
                            filter: true,
                        }}
                        onGridReady={props.onGridReady}
                    >

                        <AgGridColumn field="accountType" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                        <AgGridColumn field="firstName" sortable={true} ></AgGridColumn>
                        <AgGridColumn field="lastName" sortable={true}></AgGridColumn>
                        <AgGridColumn field="email" sortable={true}></AgGridColumn>
                        <AgGridColumn field="phone" sortable={true}></AgGridColumn>
                    </AgGridReact>
                </div>
            </Grid>
            <Grid item xs={6} sm={8} md={10} lg={11}>

            </Grid>
            <Grid item xs={12} sm={4} md={2} lg={1} style={{ marginTop: '24px' }}>
                <Button variant={'outlined'} color={'primary'}>
                    Open account
                </Button>
            </Grid>
        </Grid>
    )
}

const StyledTab = withStyles((theme) => ({

    root: {
        //   textTransform: 'none',
        //   color: '#fff',
        //   fontWeight: theme.typography.fontWeightRegular,
        //   fontSize: theme.typography.pxToRem(15),
        //   marginRight: theme.spacing(1),
        // border:"solid 2px yellow",
        '&:focus': {
            backgroundColor: '#2D2F33',
        },
        '&:selected': {
            backgroundColor: '#2D2F33',
            color: "red",
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
}))((props) => <Tab {...props} />);



function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ minWidth: "100%" }}
        >
            {value === index && (
                <Grid container item direction={"column"} >
                    {children}
                </Grid>
            )}
        </div>
    );
}


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

    },
    backgroundTab: {
        background: theme.palette.secondary.dark,
    },
    agGridContainer: {
        marginLeft: "24px",
        marginTop: "24px",
        '@media (max-width: 930px)': {
            marginLeft: "12px",

        },
        '@media (max-width: 550px)': {


        },
        '@media (max-width: 450px)': {
            marginLeft: "0px",
        },
        '@media (max-width: 370px)': {

        }
    },
    agGrid: {
        minHeight: '300px',
        minWidth: '128px',
        width: "98%",
        '@media (max-width: 550px)': {
            width: "94%"

        },
        '@media (max-width: 450px)': {
            width: "64vw"
        },
        '@media (max-width: 370px)': {

        }

    },

}));


///TODO Handle first time customers 
//TODO test paying for the first time.
//TODO test upgrading to annual.
//TODO test upgrading business.
//TODO handle payment ERRORS
const AdminPage = (props) => {
    const classes = useStyles();
    let { user, managedUsers, pending } = useSelector(state => ({
        user: state.users.user,
        managedUsers: state.managedUsers.user,
        pending: state.managedUsers.pending,

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
        };
        managedUsers = []
    }


    // console.log(getCustomClaimRole());

    const [state, setState] = useState({
        Tabs: ["Users", "Add User", "Add new Device", "Controls"],
        pick: 3,
    })


    //effect pattern to update state with new values  when they arrive
    useEffect(() => {
        if (!pending && managedUsers.length === 0) {
            props.pendingManagedUsers();
            props.fetchAdminUsers();
        }

    }, [user, managedUsers.user, state.firstName, props])


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

    const handleTabChange = (event, newValue) => {
        setState({
            ...state,
            pick: newValue
        });
    }


    ///Grid stuff
    const [gridApi, setGridApi] = useState(null);
    // const [gridColumnApi, setGridColumnApi] = useState(null);


    function onGridReady(params) {
        setGridApi(params.api);
        // setGridColumnApi(params.columnApi);
    }

    const OpenAccountData = () => {
        let selectedRows = gridApi.getSelectedRows()
        if (selectedRows !== undefined && selectedRows.length > 0) {
            // Do something 
        }
        else {
            // TODO nothing selected warning
            handleAlertOpen("Please select one or more zones to edit");
        }
    }

    const testAPIButton = async () => {
        try {
            // let UserResponse = await SetAccountOwner({UID:"abcdefghijklmnop1234"}) 
            let UserResponse = await getAuthContext()
            console.log(UserResponse)
        } catch (err) {
            console.log(err)
        }
        // getIdToken().then(function(idToken) {
        //     // Send token to your backend via HTTPS
        //     axios.post('http://localhost:5001/agromation-grow-room-control/us-central1/widgets/', {UID:"this is the UID", idToken:idToken})
        //     .then((res) => {
        //         console.log(res)
        //     }).catch((err) => {
        //         console.log(err)
        //     })
        //   }).catch(function(error) {
        //     // Handle error
        //     console.log(error);
        //   });
    }

    const testGetDataButton = async () => {
        console.log('getting data')
        try{
            // let DataResponse = await startLiveDataSession({
            //     "UID":"9bVgzHIlpGNqyWhOULNNBf36Gpg1",
            //     "deviceIDList":[
            //         "A4fhbNNtES5S5Hnj0qST"
            //     ]
            // })
            let res = await pingOTSessionService();
            console.log(res);

        }catch(err){
            console.log(err)
        }
    }


    return (
        <Container className={"containerMain"}>
            <Grid item container direction={"row"} className={classes.settingsWidget} spacing={2}>
                <Grid item xs={12} style={{ maxHeight: '48px' }}>
                    <Typography variant={"h5"}>Admin Page</Typography>
                </Grid>
                <Grid item xs={12} style={{ position: 'relative' }}>
                    <AppBar style={{ position: "absolute", top: "4px", left: "0px" }} className={classes.backgroundTab}>
                        <Tabs
                            value={state.pick}
                            onChange={handleTabChange}
                            aria-label={"handleRoom"}
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            {state.Tabs.map((item, index) => {
                                return (
                                    <StyledTab label={item} key={index} id={`scrollable-auto-tab-${index}`}
                                        aria-controls={`scrollable-auto-tabpanel-${index}`} />);
                            })}
                        </Tabs>

                    </AppBar>
                    <Grid item container direction={"row"} style={{ paddingTop: "48px" }}>
                        <TabPanel value={state.pick} index={0} id={`scrollable-auto-tabpanel-${0}`}>
                            <ManageAllUsersTable managedUsers={managedUsers} onGridReady={onGridReady} classes={classes} />
                        </TabPanel>
                        <TabPanel value={state.pick} index={1} id={`scrollable-auto-tabpanel-${1}`}>

                        </TabPanel>
                        <TabPanel value={state.pick} index={2} id={`scrollable-auto-tabpanel-${2}`}>
                            Alarms are currently in development. You will be able to set the alert levels for each datapoint monitored.
                        </TabPanel>
                        <TabPanel value={state.pick} index={3} id={`scrollable-auto-tabpanel-${3}`}>
                            <Grid item container direction={'row'} spacing={1} style={{paddingTop:"24px"}}>
                                <Grid item xs={6} sm={4}>
                                    <Button variant={'outlined'} color={'primary'} onClick={testAPIButton}>Get Auth Claims</Button>
                                </Grid>
                                <Grid item xs={6} sm={4}>
                                    <Button variant={'outlined'} color={'primary'} onClick={testGetDataButton}>Get Live Data</Button>
                                </Grid>
                            </Grid>
                        </TabPanel>
                    </Grid>
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


const formedComponent = compose(connect(mapStateToProps, { setUser: setUser, fetchAdminUsers: fetchAdminUsers, pendingManagedUsers: pendingManagedUsers }))(AdminPage);


export default formedComponent;
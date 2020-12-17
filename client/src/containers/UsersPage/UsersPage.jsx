import React, { useEffect } from 'react'
// import PropTypes from 'prop-types'
import { compose } from "redux";
import { connect, useSelector, shallowEqual } from "react-redux";
import {
    Container, Grid, makeStyles, useTheme, withStyles, Button, Modal, Box, Typography, List,
    ListItem, ListItemText, ListItemIcon, Backdrop, Fade, IconButton, Select, MenuItem, TextField, CircularProgress
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { FixedSizeList } from 'react-window';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CancelIcon from '@material-ui/icons/Cancel';
import { StandardRoundSelectForm } from "../../components/StandardSelect/StandardSelect";
import { fetchManagedUsers, pendingManagedUsers, resetPendingManagedUsers, setManagedUsers } from "../../actions/ManageUsersActions"

import { db, auth } from "../../consts/firebase";
import { FetchUidByEmail, CreateMangedAccount, SetManagedAccountClaims } from "../../CloudFunctions/CloudFunctions";



import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'; //
import { max } from 'date-fns';

// import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

export const EditUserButton = withStyles((theme) => ({

    root: {
        borderRadius: "32px",
        boxShadow: `1px 1px 1px 1px ${theme.palette.secondary.main}`,
        color: "white",
        background: theme.palette.roomStatus.fault,
        '&:hover': {
            background: theme.palette.primary.main,
            border: `solid 1px ${theme.palette.primary.main}`,
            boxShadow: 'none',
            color: "black"
        },
        '@media (max-width: 550px)': {
            fontSize: "12px"

        },
        '@media (max-width: 450px)': {
            fontSize: "10px"


        },
        '@media (max-width: 370px)': {
            fontSize: "12px"

        }
    },

}))(Button);


export const EditUserInput = withStyles((theme) => ({

    root: {
        borderRadius: "32px",
        paddingLeft: "12px",
        boxShadow: `1px 1px 1px 1px ${theme.palette.secondary.main}`,
        color: "white",
        background: theme.palette.roomStatus.fault,
        '@media (max-width: 550px)': {
            fontSize: "12px"

        },
        '@media (max-width: 450px)': {
            fontSize: "10px"


        },
        '@media (max-width: 370px)': {
            fontSize: "12px"

        }
    },

}))(TextField);

const AddUserButton = withStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: theme.palette.primary.main,
        minWidth: "64px",
        minHeight: " 64px",
        '&:hover': {
            border: `solid 2px ${theme.palette.primary.main}`
        },
    },
}))(IconButton);

const useStyles = makeStyles((theme) => ({
    usersPageWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "320px",
        minHeight: "512px",
        marginTop: "8px",
        padding: "24x",
        '@media (max-width: 550px)': {


        },
        '@media (max-width: 450px)': {


        },
        '@media (max-width: 330px)': {


        }
    },
    UserWidgetContainer: {
        marginLeft: "48px",
        '@media (max-width: 1100px)': {
            marginLeft: "0px",

        },
        '@media (max-width: 450px)': {


        },
        '@media (max-width: 330px)': {


        }
    },
    backgroundTab: {
        background: theme.palette.secondary.dark,
    },
    userInfoContainer: {
        background: theme.palette.secondary.dark,
        backgroundImage: ` url("https://cdn.discordapp.com/attachments/370759274621698048/755271571181928459/unknown.png")`,
        minWidth: "412px",
        maxWidth: "412px",
        height: "256px",
        marginLeft: "24px",
        marginBottom: "24px",
        position: "relative",
        borderRadius: "12px",
        boxShadow: "2px 2px 3px 3px " + theme.palette.secondary.dark,
        '@media (max-width: 1100px)': {
            marginLeft: "12px",

        },
        '@media (max-width: 550px)': {
            minWidth: "320px",
            maxWidth: "320px",
            marginLeft: "0"

        },
        '@media (max-width: 450px)': {
            minWidth: "256px",
            maxWidth: "256px",

        },
        '@media (max-width: 370px)': {
            minWidth: "192px",
            maxWidth: "192px",
            height: "512px",
            background: theme.palette.secondary.dark

        }
    },
    Profile: {
        background: theme.palette.secondary.main,
        minWidth: "192px",
        maxWidth: "192px",
        minHeight: "100%",
        position: "absolute",
        top: "0px",
        left: "0px",
        borderRadius: "12px",
        '@media (max-width: 550px)': {
            minWidth: "148px",
            maxWidth: "148px",

        },
        '@media (max-width: 450px)': {
            minWidth: "104px",
            maxWidth: "104px",

        },
        '@media (max-width: 370px)': {
            minWidth: "192px",
            maxWidth: "192px",
            minHeight: "50%",

        }
    },
    userNameHeader: {
        padding: "8px",
        '@media (max-width: 550px)': {
            fontSize: "16px"

        },
        '@media (max-width: 450px)': {
            fontSize: "14px"


        },
        '@media (max-width: 370px)': {
            fontSize: "16px"

        }
    },
    profileIcon: {
        color: theme.palette.primary.main,
        fontSize: "64px",
        '@media (max-width: 550px)': {
            fontSize: "48px"

        },
        '@media (max-width: 450px)': {
            fontSize: "36px"


        },
        '@media (max-width: 370px)': {
            fontSize: "48px"

        }
    },
    UserEmail: {
        color: theme.palette.roomStatus.veg,
        '@media (max-width: 550px)': {
            fontSize: "12px"

        },
        '@media (max-width: 450px)': {
            fontSize: "10px"


        },
        '@media (max-width: 370px)': {
            fontSize: "12px"

        }
    },
    zoneList: {
        position: "absolute",
        top: "6px",
        left: "200px",
        '@media (max-width: 550px)': {
            left: "148px"

        },
        '@media (max-width: 450px)': {
            left: "100px"

        },
        '@media (max-width: 370px)': {
            top: "256px",
            left: "12px",

        }

    },
    locatonListItem: {
        '@media (max-width: 550px)': {
            fontSize: "14px"

        },
        '@media (max-width: 450px)': {
            fontSize: "12px"

        },
        '@media (max-width: 330px)': {


        }
    },
    accountCircle: {
        padding: "8px",
        borderRadius: "48px",
        background: theme.palette.secondary.dark,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "12",
        overflow: "scroll",
    },
    paper: {
        position: "absolute",
        minWidth: "512px",
        top: "0px",
        color: theme.palette.text.main,
        background: "url('https://cdn.discordapp.com/attachments/370759274621698048/755271239748157540/unknown.png')",
        backgroundPosition: "center left",
        backgroundColor: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.secondary.dark}`,
        boxShadow: theme.shadows[5],
        padding: "12px",
        borderRadius: "12",
        '@media (max-width: 600px)': {
            minWidth: "448px",
            maxWidth: "99vw",
            // maxHeight: "98vh"

        },
        '@media (max-width: 550px)': {
            minWidth: "320px",


        },
        '@media (max-width: 450px)': {
            minWidth: "256px",


        },
        '@media (max-width: 370px)': {
            minWidth: "192px",

        }
    },
    setPointWidget: {
        paddingTop: "8px",
        padding: "24px",
    },
    UserUpdateModalHeaderBar: {

    },
    sliderRow: {
        // marginTop: "32px",
        // marginBottom: "32px",
        padding: "24px",
        background: theme.palette.secondary.dark,
        borderRadius: "12px",
        // border:`solid 2px ${theme.palette.secondary.dark}`
    },
    input: {
        background: theme.palette.secondary.main,
    },
    addUserButton: {
        position: "fixed",
        top: '85%',
        right: "10%",
    }


}));

export const validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validatePhone = (phone) => {
    const phoneTest = /^\d{10}$/;
    return phoneTest.test(phone);
}



const fireAuth = auth;


const UserWidget = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    let zones = props.zones;
    let type = props.type;
    let accountType = ["Admin", "User", "Viewer"];
    let fixedListWidth = 192;
    if (zones === undefined) {
        console.log("zones undefined")
        zones = ["loading rooms", "room Beta", "Veg Room 1", "veg Room 2"]
    }
    if (type === undefined) {
        // console.log("type is undefined")
        type = "Viewer";
    }
    const max550 = useMediaQuery('(max-width:550px)');

    if (max550) {
        fixedListWidth = 128;
    }




    ///Grid stuff
    const [gridApi, setGridApi] = React.useState(null);


    function onGridReady(params) {
        setGridApi(params.api);

    }



    const [state, setState] = React.useState({
        firstName: props.mUser.firstName,
        lastName: props.mUser.lastName,
        email: props.mUser.email,
        phone: props.mUser.phone,
        open: false,
    });

    const handleOpen = () => {

        setState({
            ...state,
            open: true
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,

        })
    };
    //Select any locations the account already has access too
    if (gridApi && zones[0] !== "loading rooms") {
        // console.log("setting selected locations")
        gridApi.forEachNode((node, index) => {
            zones.forEach((item, index) => {
                if (node.data.name === item.name && node.data.address === item.address) {
                    // console.log("selecting Zone")
                    node.setSelected(true);
                }
            })


        });
    }

    const setAccountTypePick = () => {
        // console.log(type)
        // console.log(props.userName)
        // console.log((type === "User"))
        if (type === "Admin") {
            return 0;
        }
        else if (type === "User") {
            // console.log("User ret")
            return 1;
        }
        else if (type === "Viewer") {
            return 2;
        }
        else {
            console.log("else")
        }

    }
    let inputPick = setAccountTypePick()
    // console.log(inputPick)
    const [pick, setPick] = React.useState(inputPick)
    // console.log(pick)



    const handleChange = (event) => {
        // console.log(name);
        setPick(event.target.value);
        // props.setRoom(event.target.value);
    };

    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const updateManagedUser = () => {
        //get the selected locations
        let selectedRows = gridApi.getSelectedRows()
        //make sure there are locations. dont let no locations be set
        if (selectedRows === undefined || selectedRows.length < 1) {
            props.handleInvalidAlertOpen("Please Select some locations for the User to access");
            return 0;
        }

        let output = {
            firstName: state.firstName,
            lastName: state.lastName,
            phone: state.phone,
            email: state.email,
            location: selectedRows,
            accountOwner: props.ownerID,
            accountType: accountType[pick]
        };
        let count = 0;
        for (let key in output) {
            //check for changes 
            if (output[key] === props.mUser[key]) {
                count++
            }
            //if the value is an Array check if the two arrays have the same name for each variables 

            if (Array.isArray(output[key])) {
                // console.log(output[key])
                // console.log(props.mUser[key]);
                let arrayCount = 0;
                let i;
                if (output[key].length === props.mUser[key].length) {
                    for (i = 0; i < props.mUser[key].length; i++) {
                        //for each item of the array where both name values are equal count
                        if (output[key][i] && output[key][i].name === props.mUser[key][i].name) {
                            arrayCount++
                        }
                    }
                    //if the arrayCount and the index are equal then the two arrays are the same
                    if (arrayCount === i) {
                        count++

                    }
                } else {

                }

            }
            if (!output[key] || output[key].length === 0) {
                props.handleInvalidAlertOpen(`${key} seems to be missing`)
                return 0
            }
        }
        if (count === Object.keys(output).length) {
            props.handleInvalidAlertOpen("Did you forget to make changes? no updates detected")
            return 0;
        }

        //check that the values are valid
        if (output.firstName.length === 0 || output.firstName.length < 3) {
            props.handleInvalidAlertOpen("Please include a first name")
            return 0;
        }
        if (output.lastName.length === 0 || output.lastName.length < 3) {
            props.handleInvalidAlertOpen("Please include a last name")
            return 0;
        }
        if (!validateEmail(output.email)) {
            props.handleInvalidAlertOpen("please Provide a valid email for reference")
            return 0;
        }
        if (output.phone.length < 5) {
            props.handleInvalidAlertOpen("Phone number is invalid")
            return 0;
        }
        if (!props.ownerID || props.ownerID === "loading") {
            props.handleInvalidAlertOpen("Unable to add new user Loading data still")
            return 0
        }

        let UserRef = db.collection("Users").doc(props.mUserDocRef)
        //then start a transaction to update the User
        db.runTransaction((transaction) => {
            return transaction.get(UserRef).then((UserDoc) => {
                if (!UserDoc.exists) {
                    throw new Error("Document does not exist")
                }
                let data = UserDoc.data();
                // console.log(data);
                // console.log(output)
                for (let key in data) {
                    let item = Object.keys(output).find((element) => {
                        if (key === element || key === "UID") {
                            return true
                        }
                        return false;
                    });
                    if (!item) {
                        throw new Error("Keys missing in Output")
                    }
                }
                transaction.update(UserRef, output);
                output.doc = UserDoc.id;
                return output;
                //do the update and return output
            }).then((output) => {
                let newReduxManagedLocationsArray = props.managedUsers
                newReduxManagedLocationsArray[props.UserIndex] = output
                props.setManagedUsers(newReduxManagedLocationsArray);
                props.handleInvalidAlertOpen("Successfully updated User profile", "success");
                handleClose();
            }).catch((err) => {
                props.handleInvalidAlertOpen("error");
                console.log(err);
            })
        })
        //read the user
        //update the user assuming it makes sense
    };

    const sendPasswordResetEmail = () => {
        auth.sendPasswordResetEmail(props.mUser.email).then(function () {
            // Email sent.
            props.handleInvalidAlertOpen("Successfully sent password reset email", "success");
        }).catch(function (error) {
            // An error happened.
            console.log(error)
            props.handleInvalidAlertOpen("Error something went wrong");
        });
    }

    const deleteManagedUser = () => {

    }


    const Row = ({ index, style }) => (
        <div style={style} className={classes.locatonListItem}><ListItemIcon style={{ minWidth: "24px" }}><CheckCircleRoundedIcon style={{ color: theme.palette.primary.main, fontSize: "18px" }} /></ListItemIcon>{zones[index].name}</div>
    );

    return (
        <Grid item container direction={"row"} className={classes.userInfoContainer} xs>
            <Grid item container xs={12} sm className={classes.Profile} direction={"column"} alignItems={"center"}>
                <Grid item xs></Grid>
                <Grid item xs > <Typography variant={"h6"} className={classes.userNameHeader} >{props.userName}</Typography></Grid>
                <Grid item xs ><Box className={classes.accountCircle}><AccountCircleRoundedIcon className={classes.profileIcon} /></Box></Grid>
                <Grid item xs></Grid>
                <Grid item xs>{type}</Grid>
                <Grid item xs><Typography variant={"body2"} className={classes.UserEmail} >{props.email}</Typography></Grid>
            </Grid>
            <Grid item xs={12} sm >
                <List className={classes.zoneList}>
                    <ListItem>
                        <ListItemText primary={"Locations"}></ListItemText>
                    </ListItem>
                    <ListItem >
                        <FixedSizeList height={128} width={fixedListWidth} itemSize={48} itemCount={zones.length}>
                            {Row}
                        </FixedSizeList>
                    </ListItem>
                    <ListItem>
                        <EditUserButton variant={"contained"} onClick={handleOpen}>Edit user</EditUserButton>
                    </ListItem>
                </List>
            </Grid>
            <Modal
                aria-labelledby="update-user-modal"
                aria-describedby="update-user-modal-description"
                className={classes.modal}
                open={state.open}
                onClose={handleClose}
                closeAfterTransition
                disableScrollLock
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={state.open}>
                    <Box className={classes.paper}>
                        <form noValidate >
                            <Grid item container direction={"column"} className={classes.setPointWidget}>
                                <Grid item container direction={"row"} className={classes.UserUpdateModalHeaderBar}>
                                    <Grid item xs> <Grid item ><h3 id="update-user-modal">Edit User</h3></Grid></Grid>
                                    <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                                </Grid>
                                <Grid item container direction={"row"} spacing={2}>
                                    <Grid item xs={6} sm={6}>
                                        <EditUserInput label={"First Name"} name={"firstName"} value={state.firstName} inputProps={{ 'aria-label': 'input first name' }} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <EditUserInput label={"Last Name"} name={"lastName"} value={state.lastName} inputProps={{ 'aria-label': 'input last name' }} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <EditUserInput label={"User Email"} name={"email"} value={state.email} inputProps={{ 'aria-label': 'input email' }} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <EditUserInput label={"User Phone"} name={"phone"} value={state.phone} inputProps={{ 'aria-label': 'input phone' }} onChange={handleInputChange} />
                                    </Grid>


                                </Grid>
                                <Grid item container direction={"row"} className={classes.sliderRow}>
                                    <Grid item xs={6} sm={4} md={12}> <h4>Security</h4></Grid>
                                    <Grid item xs={6} sm={4} md={6}>
                                        <StandardRoundSelectForm className={classes.formControl} hiddenLabel>
                                            <Select
                                                value={pick}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: 'pick',
                                                    id: 'AccountType',
                                                }}
                                                defaultValue={2}
                                                label={"Account Type"}
                                            >
                                                {accountType.map((Item, Index) => (
                                                    <MenuItem key={Index} value={Index}>{Item}</MenuItem>
                                                ))}
                                            </Select>
                                        </StandardRoundSelectForm>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={6} style={{ paddingBottom: "12px", paddingRight: "12px" }}>
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
                                    <Grid item xs={12} sm={6} style={{ paddingBottom: "24px", paddingTop: "4px" }}>
                                        <Button variant={"outlined"} color={"primary"} onClick={updateManagedUser}>
                                            SAVE USER DETAILS
                                        </Button>
                                    </Grid>


                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </Grid>
    );
}

const UsersPage = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    let accountType = ["Admin", "User", "Viewer"];
    
    let { user, locations, auth, pending, managedUsers } = useSelector(state => ({
        user: state.users.user,
        pending: state.managedUsers.pending,
        locations: state.users.user.location,
        auth: state.auth.authenticated,
        managedUsers: state.managedUsers.user

    }), shallowEqual)


    // console.log(user);
    const testManagedUsers = (item) => {
        // console.log(item)
        if (item === undefined) {
            return true;
        }
        if (!item.length > 0) {
            return true;
        }
        if (item[0].example) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        //passes is managed Users is indefined or has a length of zero
        //passes if auth is not null and auth.uid is not defined
        //passes if users.uid is not und)
        // 
        if (auth === null) {

        } else if (!pending && testManagedUsers(managedUsers) && auth.uid !== undefined && user.UID !== undefined) {
            console.log("getting managed user");
            props.pendingManagedUsers()
            if (user.accountOwner) {
                props.fetchManagedUsers(user.accountOwner)
            } else {
                props.fetchManagedUsers(auth.uid)
            }


        }
    })

    //check if data has loaded and if not display loading text
    if (user.firstName === undefined || user.location.length === undefined) {
        // console.log("setting loading data")
        user = {
            name: "loading",
            location: [
                {
                    name: "loading",
                    address: "Loading Address"
                },
                {
                    name: "loading locations",
                    address: "loading address"
                },

            ],
            subscription: {}
        };
    }

    // console.log(managedUsers);
    // console.log(testManagedUsers(managedUsers))
    if (testManagedUsers(managedUsers)) {
        managedUsers = [
            {
                firstName: "loading",
                lastName: "loading",
                type: "loading",
                email: "loading",
                phone: "loading",
                Level: 1,
                zones: ["location Alpha", "location Beta", "location 1", "location 2"],
                active: true,
                example: true,
            },
        ]
    }

    let accountUsedSeats = "1/1";
    let maxManagedUsers = 0;
    if (user.subscription.status && managedUsers) {

        switch (user.subscription.role) {
            case "premium":
                accountUsedSeats = managedUsers.length + " / 5";
                maxManagedUsers = 5;
                break;
            case "business":
                accountUsedSeats = managedUsers.length + " / 10";
                maxManagedUsers = 10;
                break;
            default:
                console.log("free account handle managed users")
                break;
        }
    }

    const [state, setState] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        errorMsg: "",
        alertType: "error",
        invalidAlert: false,
    })
    //Add User modal
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        let maxSeats = 0;
        switch (user.subscription.role) {
            case "premium":
                maxSeats = 5;
                break;
            case "business":
                maxSeats = 10;
                break;
            default:
                console.log("free account handle managed users")
                break;
        }
        // console.log(managedUsers.length)
        // console.log(maxSeats);
        if (managedUsers.length < maxSeats) {
            setOpen(true);
        }else{
            handleInvalidAlertOpen("cannot add more users without upgrading your plan.");
        }

    };

    const handleInvalidAlertOpen = (msg, type) => {
        if (type === "success") {
            // console.log("successAlert")
            setState({
                ...state,
                errorMsg: msg,
                invalidAlert: true,
                alertType: "success"
            });
        } else {
            // console.log("error alert")
            setState({
                ...state,
                errorMsg: msg,
                invalidAlert: true,
                alertType: "error"
            });
        }

    };

    const handleClose = () => {
        if (state.firstName.length > 0 || state.lastName.length > 0 || state.email.length > 0 || state.phone.length > 0) {
            setState({
                ...state,
                errorMsg: "Changes have not been saved hit x to exit",
                invalidAlert: true
            })

        } else {
            setOpen(false);
        }

    };

    const xExit = () => {
        if (state.firstName.length > 0 || state.lastName.length > 0 || state.email.length > 0 || state.phone.length > 0) {
            // setState({
            //     ...state,
            //     errorMsg: ,
            //     invalidAlert: true
            // })
            handleInvalidAlertOpen("Warning changes have not been saved")

        }
        setOpen(false);
    }

    const [Userpick, setPick] = React.useState(2)
    // console.log(pick)

    const handleChange = (event) => {
        setPick(event.target.value);

    };

    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    ///Grid stuff
    const [gridApi, setGridApi] = React.useState(null);
    // const [gridColumnApi, setGridColumnApi] = React.useState(null);

    function onGridReady(params) {
        setGridApi(params.api);
        // setGridColumnApi(params.columnApi);
    }

    //alerts 
    const handleInvalidAlertClose = () => {
        setState({
            ...state,
            invalidAlert: false
        });
    };


    const submitNewUser = async () => {
        if (managedUsers.length >= maxManagedUsers) {
            setState({
                ...state,
                errorMsg: "Your Subscription only allows " + maxManagedUsers + " Users",
                invalidAlert: true,
            })
            return 0;
        }
        if (state.firstName.length === 0 || state.firstName.length < 3) {
            setState({
                ...state,
                errorMsg: "Please include a first name",
                invalidAlert: true,
            })
            return 0;
        }
        if (state.lastName.length === 0 || state.lastName.length < 3) {
            setState({
                ...state,
                errorMsg: "Please include a last name",
                invalidAlertL: true
            })
            return 0;
        }
        if (!validateEmail(state.email)) {
            setState({
                ...state,
                errorMsg: "please Provide a valid email for reference",
                invalidAlert: true,
            })
            return 0;
        }
        if (state.phone.length < 5) {
            setState({
                ...state,
                errorMsg: "Phone number is invalid",
                invalidAlert: true,
            })
            return 0;
        }
        if (user.name === "loading") {
            setState({
                ...state,
                errorMsg: "Unable to add new user Loading data still",
                invalidAlert: true,
            })
            return 0
        }
        let selectedRows = gridApi.getSelectedRows()
        if (selectedRows === undefined || selectedRows.length < 1) {
            handleInvalidAlertOpen("Please Select some locations for the User to access");
            return 0;
        }
        let output = {
            firstName: state.firstName,
            lastName: state.lastName,
            phone: state.phone,
            email: state.email.toLowerCase(),
            location: selectedRows,
            accountOwner: user.UID,
            accountType: accountType[Userpick]
        };
        let lowerCaseEmail = state.email.toLowerCase()

        
        try {
            let UsersSnapshot = await db.collection("Users").where("email", "==", lowerCaseEmail).get();
            if (UsersSnapshot.empty) {
                //since user is new check if they have an auth account
                try {
                    let oldAuthUser = await FetchUidByEmail({ email: output.email });
                    if (oldAuthUser.data.uid) {
                        
                        //found old auth User add uid to output object and upload into firestore.
                        //update the found UID with the auth claims
                        output.UID = oldAuthUser.data.uid;
                        try {
                            //update auth claims
                            await SetManagedAccountClaims({ uid: oldAuthUser.data.uid, accountType: output.accountType.toLowerCase() })
                            try {
                                // add user to firestore
                                let dbRes = await db.collection('Users').add(output);
                                //check for the id to ensure success 
                                if (dbRes.id !== undefined) {
                                    //handle account upload success
                                    let newReduxManagedLocationsArray = managedUsers
                                    newReduxManagedLocationsArray.push({ doc: dbRes.id, ...output })
                                    props.setManagedUsers(newReduxManagedLocationsArray);
                                    handleInvalidAlertOpen("Success added User they can now login and access your data", 'success')
                                    setOpen(false);
                                }
                            } catch (err) {
                                console.log("error uploading user info with old UID");
                                console.log(err);
                                handleInvalidAlertOpen("Error failed add new account. contact your administrator if this error persists");
                            }


                        } catch (err) {
                            console.log("error setting accounts auth claims")
                            console.log(err)
                            handleInvalidAlertOpen("Error failed to update account with access permissions. contact your administrator if this error persists");
                        }

                        //then upload into db
                        //Here we create a new auth user instead of adding the existing uid
                    } else {
                        // console.log('Create new user')
                        //no UID present need to create a new auth account and add that uid to output object first
                        try {
                            let newAuthUser = await CreateMangedAccount({ email: output.email });
                            if (newAuthUser.data.uid) {
                                //we have the new uid now we can add claims and upload to db
                                output.UID = newAuthUser.data.uid;
                                try {
                                    await SetManagedAccountClaims({ uid: newAuthUser.data.uid, accountType: output.accountType.toLowerCase() })
                                    try {
                                        let dbRes = await db.collection('Users').add(output);
                                        //check for the id to ensure success 
                                        // console.log(dbRes);
                                        if (dbRes.id !== undefined) {
                                            //handle account upload success
                                            //add new account to redux store so its displayed on the page.
                                            let newReduxManagedLocationsArray = managedUsers
                                            newReduxManagedLocationsArray.push({ doc: dbRes.id, ...output })
                                            props.setManagedUsers(newReduxManagedLocationsArray);
                                            try {
                                                let reset = await fireAuth.sendPasswordResetEmail(output.email)
                                                handleInvalidAlertOpen("Success added User they can now login and access your data", 'success')
                                                setOpen(false);
                                            } catch (err) {
                                                console.log(err)
                                                handleInvalidAlertOpen("Error failed to send password reset email to new user. You can manually send a password reset in the edit account page.");
                                                setOpen(false);
                                            }

                                        }
                                    } catch (err) {
                                        console.log("error uploading user info with new UID");
                                        console.log(err);
                                        handleInvalidAlertOpen("Error failed to upload account info. contact your administrator if this error persists");
                                    }


                                } catch (err) {
                                    console.log("error setting accounts auth claims")
                                    console.log(err)
                                    handleInvalidAlertOpen("Error failed to update account with access permissions. contact your administrator if this error persists");
                                    
                                }
                            }else{
                                console.log('error auth user already exists')
                                console.log(newAuthUser);
                            }

                        } catch (err) {
                            console.log(err)
                            handleInvalidAlertOpen("Error failed to create new account. contact your administrator if this error persists");
                        }///testing
                    }

                } catch (err) {
                    console.log(err)
                    handleInvalidAlertOpen("Error fetching auth user from server. contact your administrator if this error persists");
                }

            } else {
                //here we handle finding User that is already in the database but not associated with this account owner
                // throw error email is already in use 
                handleInvalidAlertOpen("Error Email is already in use contact an administrator for assistance");
            }
        } catch (err) {
            console.log(err);
            handleInvalidAlertOpen("Error Connecting to the server try again in a few minutes or contact an administrator");
        }





    }

    return (
        <Container className={"containerMain"}>
            <Grid container item direction={"column"} spacing={5} className={classes.usersPageWidget} alignItems={"center"}>
                <Grid item container direction={'row'} style={{ paddingRight: "24px" }}>
                    <Grid item xs={12} sm={8} md={10} lg={11}>
                        <Typography variant={"h4"}>Manage Users</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2} lg={1}>
                        <Typography variant={'h6'}>{accountUsedSeats}</Typography>
                    </Grid>
                </Grid>
                <Grid item container direction={"row"} spacing={5} className={classes.UserWidgetContainer} justify={"flex-start"}>
                    {managedUsers.map((item, index) => {
                        if (item.firstName !== "loading") {
                            return (
                                <UserWidget key={index} UserIndex={index} mUserDocRef={item.doc} ownerID={user.UID} handleInvalidAlertOpen={handleInvalidAlertOpen} mUser={item}
                                    userName={item.firstName + " " + item.lastName} firstName={item.firstName} lastName={item.lastName} email={item.email} type={item.accountType} phone={item.phone}
                                    location={locations} managedUsers={managedUsers} zones={managedUsers[index].location} setManagedUsers={props.setManagedUsers} />
                            );
                        } else {
                            return (
                                <CircularProgress key={index} color="primary" />
                            );

                        }

                    })}
                </Grid>
            </Grid>
            <AddUserButton className={classes.addUserButton} onClick={handleOpen}>
                <AddCircleRoundedIcon fontSize={"large"} />
            </AddUserButton>
            <Modal
                aria-labelledby="Add-User-Modal"
                aria-describedby="Add-New-User-Modal"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className={classes.paper}>
                        <form noValidate >
                            <Grid item container direction={"column"} className={classes.setPointWidget}>
                                <Grid item container direction={"row"}>
                                    <Grid item xs> <Grid item ><h3 id="Add-User-Modal">Add New User</h3></Grid></Grid>
                                    <Grid item> <IconButton onClick={xExit} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                                </Grid>
                                <Grid item container direction={"row"} spacing={3}>
                                    <Grid item xs={6} sm={6}>
                                        <EditUserInput label={"First Name"} name={"firstName"} value={state.firstName} inputProps={{ 'aria-label': 'input first name' }} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <EditUserInput label={"Last Name"} name={"lastName"} value={state.lastName} inputProps={{ 'aria-label': 'input last name' }} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <EditUserInput label={"User Email"} name={"email"} value={state.email} inputProps={{ 'aria-label': 'input email' }} onChange={handleInputChange} />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <EditUserInput label={"User Phone"} name={"phone"} value={state.phone} inputProps={{ 'aria-label': 'input phone' }} onChange={handleInputChange} />
                                    </Grid>
                                </Grid>
                                <Grid item container direction={"row"} className={classes.sliderRow}>
                                    <Grid item xs={6}> <h4>Security</h4></Grid>

                                    <Grid item xs={6}>
                                        <StandardRoundSelectForm className={classes.formControl} label={"Select account type"}>
                                            <Select
                                                value={Userpick}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: 'pick',
                                                    id: 'AddAccountType',
                                                }}
                                                defaultValue={2}
                                                label={"Account Type"}
                                            >
                                                {accountType.map((Item, Index) => (
                                                    <MenuItem key={Index} value={Index}>{Item}</MenuItem>
                                                ))}
                                            </Select>
                                        </StandardRoundSelectForm>
                                    </Grid>
                                    <Grid item container xs={12} style={{ paddingTop: "8px" }}>
                                        <Typography variant={"body1"}>Choose locations</Typography>
                                        <div style={{ minHeight: '300px', minWidth: '200px', width: "98%" }} className="ag-theme-alpine-dark" >
                                            <AgGridReact
                                                rowData={locations}
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
                                    <Grid item xs={12} sm={3} md={2} style={{ paddingTop: "8px" }}>
                                        <Button variant={"outlined"} color={"primary"} onClick={submitNewUser}>
                                            SAVE USER DETAILS
                                        </Button>
                                    </Grid>


                                </Grid>

                            </Grid>
                        </form>


                    </Box>
                </Fade>
            </Modal>
            <Snackbar open={state.invalidAlert} autoHideDuration={6000} onClose={handleInvalidAlertClose}>
                <Alert onClose={handleInvalidAlertClose} severity={state.alertType}>
                    {state.errorMsg}
                </Alert>
            </Snackbar>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return { user: state.user };
}

const formedComponent = compose(
    connect(mapStateToProps, { fetchManagedUsers: fetchManagedUsers, pendingManagedUsers: pendingManagedUsers, resetPendingManagedUsers: resetPendingManagedUsers, setManagedUsers: setManagedUsers }))(UsersPage);

export default formedComponent;

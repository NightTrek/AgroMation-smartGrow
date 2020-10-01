import React, { useEffect} from 'react'
// import PropTypes from 'prop-types'
import { compose } from "redux";
import { connect, useSelector, shallowEqual } from "react-redux";
import {
    Container, Grid, makeStyles, useTheme, withStyles, Button, Modal, Box, Typography, List,
    ListItem, ListItemText, ListItemIcon, Backdrop, Fade, IconButton, Input, Select, MenuItem,
} from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { FixedSizeList } from 'react-window';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import CancelIcon from '@material-ui/icons/Cancel';
import { StandardRoundSelectForm } from "../../components/StandardSelect/StandardSelect";
import {fetchManagedUsers, pendingManagedUsers, resetPendingManagedUsers } from "../../actions/ManageUsersActions"

import {exampleManagedUsers} from "../../exampleDataTypes/clientExamlpeDataTypes";




const EditUserButton = withStyles((theme) => ({

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
    },

}))(Button);


const EditUserInput = withStyles((theme) => ({

    root: {
        borderRadius: "32px",
        paddingLeft:"12px",
        boxShadow: `1px 1px 1px 1px ${theme.palette.secondary.main}`,
        color: "white",
        background: theme.palette.roomStatus.fault,
    },

}))(Input);

const useStyles = makeStyles((theme) => ({
    usersPageWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "320px",
        minHeight: "512px",
        marginTop: "8px",
        padding: "24x",
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
    },
    zoneList: {
        position: "absolute",
        top: "6px",
        left: "200px"

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
    },
    paper: {
        position: "absolute",
        minWidth: "512px",
        color: theme.palette.text.main,
        background:"url('https://cdn.discordapp.com/attachments/370759274621698048/755271239748157540/unknown.png')",
        backgroundPosition:"top left",
        backgroundColor: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.secondary.dark}`,
        boxShadow: theme.shadows[5],
        padding: "12px",
        borderRadius: "12",
    },
    setPointWidget: {
        paddingTop: "0px",
        padding: "24px",
    },
    sliderRow: {
        marginTop: "32px",
        marginBottom: "32px",
        padding: "24px",
        background: theme.palette.secondary.dark,
        borderRadius: "12px",
        // border:`solid 2px ${theme.palette.secondary.dark}`
    },
    input: {
        background: theme.palette.secondary.main,
    }


}));







const UserWidget = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    let zones = props.zones;

    if(zones === undefined){
        zones = ["loading rooms", "room Beta", "Veg Room 1", "veg Room 2"]
    }
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const setAccountTypePick = () => {
        console.log(props.type)
        console.log(props.userName)
        console.log((props.type === "User"))
        if(props.type === "Admin"){
            return 0;
        }
        if(props.type === "User"){
            console.log("User ret")
            return 1;
        }
        if(props.type === "Viewer"){
            return 2;
        }
        
    }
    let pick = setAccountTypePick()
    console.log(pick)
    //Account Type
    const [state, setState] = React.useState({ //setState
        accountType: ["Admin", "User", "viewer"],
        pick: pick
    });
    console.log(state.pick)
    const handleChange = (event) => {
        const name = event.target.name;
        // console.log(name);
        setState({
            ...state,
            [name]: event.target.value,
        });
        // props.setRoom(event.target.value);
    };


    const Row = ({ index, style }) => (
        <div style={style}><ListItemIcon><CheckCircleRoundedIcon style={{ color: theme.palette.primary.main, fontSize: "18px" }} /></ListItemIcon>{zones[index]}</div>
    );
    return (
        <Grid item container direction={"row"} className={classes.userInfoContainer} xs>
            <Grid item container xs className={classes.Profile} direction={"column"} alignItems={"center"}>
                <Grid item xs></Grid>
                <Grid item xs > <Typography variant={"h6"} >{props.userName}</Typography></Grid>
                <Grid item xs ><Box className={classes.accountCircle}><AccountCircleRoundedIcon style={{ fontSize: "64px", color: theme.palette.primary.main }} /></Box></Grid>
                <Grid item xs></Grid>
                <Grid item xs>{props.type}</Grid>
                <Grid item xs><Typography variant={"body2"} style={{ color: theme.palette.roomStatus.veg }}>{props.email}</Typography></Grid>
            </Grid>
            <Grid item xs >
                <List className={classes.zoneList}>
                    <ListItem>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={"Zones"}></ListItemText>
                    </ListItem>
                    <ListItem >
                        <FixedSizeList height={128} width={192} itemSize={32} itemCount={zones.length}>
                            {Row}
                        </FixedSizeList>
                    </ListItem>
                    <ListItem>
                        <EditUserButton variant={"contained"} onClick={handleOpen}>Edit user</EditUserButton>
                    </ListItem>
                </List>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
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
                                    <Grid item xs> <Grid item ><h3 id="transition-modal-title">Edit User</h3></Grid></Grid>
                                    <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                                </Grid>
                                <Grid item container direction={"row"} spacing={5}>
                                    <Grid item xs={12} sm={6}>

                                        <EditUserInput defaultValue={props.userName} inputProps={{ 'aria-label': 'description' }} />


                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <StandardRoundSelectForm className={classes.formControl} hiddenLabel>
                                            <Select
                                                value={state.pick}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: 'pick',
                                                    id: 'AccountType',
                                                }}
                                                defaultValue={2}
                                            >
                                                {state.accountType.map((Item, Index) => (
                                                    <MenuItem key={Index} value={Index}>{Item}</MenuItem>
                                                ))}
                                            </Select>
                                        </StandardRoundSelectForm>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <EditUserInput defaultValue={props.email} inputProps={{ 'aria-label': 'description' }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <EditUserInput defaultValue={props.phone} inputProps={{ 'aria-label': 'description' }} />
                                    </Grid>

                                </Grid>
                                <Grid item container direction={"column"} className={classes.sliderRow}>
                                    <Grid item container direction={"row"} style={{ padding: "6px", marginBottom: "24px" }}>
                                        <Grid item> <h4>Security</h4></Grid>
                                        <Grid item xs> </Grid>
                                    </Grid>
                                    <Grid item container direction={'row'}>

                                        <Grid item xs>
                                            <EditUserInput label={"Generated password"} defaultValue={"*********************"} inputProps={{ 'aria-label': 'description' }} />
                                        </Grid>
                                        <Grid item xs>
                                            <EditUserButton color={"primary"}>
                                                Generate new Password
                                        </EditUserButton>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item container direction={"row"}>
                                    <Grid item xs></Grid>
                                    <Grid item xs>
                                        <Button variant={"outlined"} color={"primary"}>
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

    let {user,pick, auth, pending, managedUsers} = useSelector( state => ({
        user:state.users.user,
        pending:state.managedUsers.pending,
        pick:state.users.activeLocation,
        auth:state.auth.authenticated,
        managedUsers: state.managedUsers.user

    }),shallowEqual)

    // console.log(user);
    const testManagedUsers = (item) => {
        console.log(item)
        if(item === undefined){
            return true;
        }
        if(!item.length>0){
            return true;
        }
        if(item[0].example){
            return true;
        }
        return false;
    }

    useEffect(()=>{
        //passes is managed Users is indefined or has a length of zero
        //passes if auth is not null and auth.uid is not defined
        //passes if users.uid is not und)

        if(auth === null){
            
        }else if(!pending && testManagedUsers(managedUsers)  &&  auth.uid !== undefined && user.UID !== undefined){
                console.log("getting managed user");
                props.pendingManagedUsers()
                props.fetchManagedUsers(auth.uid)
                
            }
    })
    
    //check if data has loaded and if not display loading text
    if(user.firstName === undefined || user.location.length === undefined){
        console.log("setting loading data")
        user = {
            name:"loading",
            location:[
                {
                    name:"loading",
                    address: "Loading Address"
                },
                {
                    name:"loading locations",
                    address: "loading address"
                },
                
            ]
        };
    }
    // console.log(managedUsers);
    // console.log(testManagedUsers(managedUsers))
    if(testManagedUsers(managedUsers)){
        managedUsers = [
            {
                userName: "loading Users",
                type: "loading",
                email: "loading",
                phone:"loading",
                Level: 1,
                zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2"],
                active: true,
                example:true,
            },
        ]
    }
    // else{
    //     console.log(managedUsers[0].accountType === "User")
    //     console.log(managedUsers[1].accountType=== "User")
    //     console.log(managedUsers[2].accountType=== "User")
    // }

    
    return (
        <Container className={"containerMain"}>
            <Grid container item direction={"column"} spacing={5} className={classes.usersPageWidget} alignItems={"center"}>
                <Grid item container direction={'row'} style={{ paddingRight: "24px" }}>
                    <Grid item xs>
                        <Typography variant={"h4"}>Manage Users</Typography>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
                <Grid item container direction={"row"} spacing={5} style={{ marginLeft: "48px" }} justify={"flex-start"}>
                    {managedUsers.map((item, index) => {
                        return (
                            <UserWidget key={index} UserIndex={index} userName={item.firstName + " " + item.lastName} email={item.email} type={item.accountType} phone={item.phone} zones={managedUsers[index].zones} />
                        );
                    })}
                </Grid>
            </Grid>
        </Container>
    )
}
const mapStateToProps = ( state ) => {
    return { user: state.user };
}

const formedComponent = compose(
    connect(mapStateToProps, { fetchManagedUsers: fetchManagedUsers, pendingManagedUsers:pendingManagedUsers, resetPendingManagedUsers:resetPendingManagedUsers }))(UsersPage);

export default formedComponent;

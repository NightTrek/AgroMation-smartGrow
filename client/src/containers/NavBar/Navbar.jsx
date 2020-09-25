import React, { useEffect} from 'react';
import { NavLink, useLocation, withRouter} from 'react-router-dom';
import { compose } from "redux";
import { connect, useSelector, shallowEqual } from "react-redux";
import { reduxForm } from "redux-form";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BusinessIcon from '@material-ui/icons/Business';
import SettingsIcon from '@material-ui/icons/Settings';
import agroLogo from "./../../img/AgroMationLogosquare512.png";
import GroupIcon from '@material-ui/icons/Group';
import agroLogoCombined from '../../img/AgroMationCombined.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
// import Box from '@material-ui/core/Box';
import "./style.css";
import { Grid, withStyles } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { fetchUser, setLocation, fetchUserPending } from "../../actions/User";


//

const drawerWidth = 240;


const StandardRoundSelectForm = withStyles((theme) => ({

    root: {
        borderRadius:"24px",
        background:theme.palette.secondary.dark,
        paddingLeft:"24px",
        paddingRight:'6px',
        "& .muiSelect-select":{
            
        }
    },
    
}))(FormControl);



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        background: theme.palette.secondary.main,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        // background: theme.palette.secondary.dark,
        background: `url('https://cdn.discordapp.com/attachments/370759274621698048/755271571181928459/unknown.png')`,
        backgroundSize: "cover",
        backgroundPosition:"bottom center",
        color: "white",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        background: theme.palette.secondary.dark,
        
        color: "white",
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        // background: theme.palette.secondary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),

        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    title: {
        flexGrow: 1
    },
    drawerBox: {
        background: theme.palette.secondary.main,
        
        width: "200px",
        height: "128px",
        margin: "20px",
        marginBottom: "4px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        position: "relative"

    },
    bottomdrawerBox: {
        background: theme.palette.secondary.main, 
        width: "200px",
        height: "160px",
        margin: "20px",
        marginTop: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
    // selectEmpty: {
    //     marginTop: theme.spacing(2),
    // },
    locationName: {
        color: theme.palette.roomStatus.veg
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));



 const MiniDrawer = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const PageName = useLocation();
    // const dispatch = useDispatch();

    let {user,pick, auth, pending} = useSelector( state => ({
        user:state.users.user,
        pending:state.users.pending,
        pick:state.users.activeLocation,
        auth:state.auth.authenticated

    }),shallowEqual)

    // console.log(user);
    

    useEffect(()=>{
        // if(auth.uid === )
        if(!pending && user.firstName === undefined || user.location.length === undefined ){
            // console.log(user);
            props.fetchUserPending()
            props.fetchUser(auth.uid)
            
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
        pick = 0;
    }

    const [open, setOpen] = React.useState(false);


    //dispatches location change to redux state. changes the index of state.users.activelocation for the state.users.user.location array
    const handleChange = (event) => {
        props.setLocation(event.target.value);
    };

    //checks if auth has a value and opens if it does
    const handleDrawerOpen = () => {
        if(auth){
            setOpen(true);
        }
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    const getPageNameFromAddress = () => {
        const array = PageName.pathname.split('/');
        return array[1];
    }

    const menuIcons = [<DashboardIcon data-index={"dashboard"} color={"primary"} />, <BusinessIcon data-index={"rooms"} color={"primary"} />, <GroupIcon data-index={"users"} color={"primary"} />, <SettingsIcon data-index={"settings"} color={"primary"} />, <ExitToAppIcon data-index={'signout'} color={"primary"}/>]

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.title}>
                        {getPageNameFromAddress() || "AgroMation"}
                    </Typography>
                    <img src={agroLogo} alt={"AgroMation logo"} className={"topbarLogoLeft"} />
                </Toolbar>
            </AppBar>
            {/* everything below this is part of the side drawer */}
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon color="primary" fontSize="large" />}
                    </IconButton>
                </div>
                {/* Below this is the sidebar menu contents */}
                <Divider />
                {open ?
                    <div className={classes.drawerBox}>
                        <div className={"sideBarLogoBox"}>
                            <img src={agroLogoCombined} alt={"AgroMation logo"} className={"SideMenuLogo"} />
                        </div>
                    </div> : <div></div>}
                {open ?
                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        spacing={3}
                        className={classes.bottomdrawerBox}>

                        <Typography variant={"h5"} className={classes.locationName}>
                            {user.location[pick].name || "Green Gardens"}
                        </Typography>


                        <StandardRoundSelectForm className={classes.formControl} hiddenLabel >
                            {/* <InputLabel style={{alignItems:"center",color:"white"}}>Location</InputLabel> */}
                            <Select
                                value={pick}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'pick',
                                    id: 'Location-Name',
                                }}
                                defaultValue={0}
                            >
                                {user.location.map((Item, Index) => (
                                    <MenuItem key={Index} value={Index}>{Item.name}</MenuItem>
                                ))}
                            </Select>
                        </StandardRoundSelectForm>
                        <Typography variant={"subtitle2"}>
                            {user.location[pick].address || "9898 Trent Bypass suite 541"}
                        </Typography>
                    </Grid> : <div></div>}
                <Divider />
                <List>
                    {['Dashboard', 'Rooms', 'Users', 'Settings','Signout'].map((text, index) => (
                        <NavLink to={"/" + text} key={text} onClick={(e) =>{
                            if(auth == undefined || auth === ""){
                                e.preventDefault()
                            }
                        }}> 
                            <ListItem button data-index={text} key={text} value={text}>

                                <ListItemIcon data-index={text} value={text} >{menuIcons[index]}</ListItemIcon>
                                <ListItemText data-index={text} value={text} primary={text} />

                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
            </main>
        </div>
    );
}

const mapStateToProps = ( state ) => {
    return { user: state.user };
}

const formedComponent = compose(
    connect(mapStateToProps, { fetchUser: fetchUser, setLocation: setLocation, fetchUserPending:fetchUserPending }),
    reduxForm({ form: 'Add todo' })
)(MiniDrawer);

export default withRouter(formedComponent);
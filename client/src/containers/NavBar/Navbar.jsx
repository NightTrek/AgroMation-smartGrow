import React from 'react';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import agroLogo from "./../../img/AgroMationLogosquare512.png";
import agroLogoCombined from '../../img/AgroMationCombined.png';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Box from '@material-ui/core/Box';
import "./style.css";
import { Grid } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';

const drawerWidth = 240;

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
        background: theme.palette.secondary.dark,
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
    locationName:{
        color:theme.palette.roomStatus.veg
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [state, setState] = React.useState({
        locations: ["Green Gardens","Desert Warhouse", "Hilltop Garden"],
        pick:0
    });

    const handleChange = (event) => {
        const name = event.target.name;
        console.log(name);
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
                        {props.currentPage || "AgroMation"}
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
                            {state.locations[state.pick] || "Green Gardens"}
                        </Typography>


                        <FormControl variant={"filled"} className={classes.formControl}>
                            <InputLabel htmlFor="Location-Name">Locations</InputLabel>
                            <Select
                                value={state.pick}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'pick',
                                    id: 'Location-Name',
                                }}
                                defaultValue={0}
                            >
                                {console.log(state)}
                                {state.locations.map((Item, Index) => (
                                <MenuItem key={Index} value={Index}>{Item || Item.name}</MenuItem>
                                )) }
                            </Select>
                        </FormControl>
                        <Typography variant={"subtitle2"}>
                            {props.currentLocationAddress || "9898 Trent Bypass suite 541"}
                        </Typography>
                    </Grid> : <div></div>}
                <Divider />
                <List>
                    {['Dashboard', 'Rooms', 'Users', 'Settings'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon color="primary" /> : <MailIcon color="primary" />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
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

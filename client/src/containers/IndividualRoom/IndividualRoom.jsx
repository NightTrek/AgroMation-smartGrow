import React from 'react'
// import PropTypes from 'prop-types'
import { Container, Grid, makeStyles, withStyles, Tab, Tabs, AppBar, useMediaQuery, Menu, MenuItem, IconButton, Typography } from '@material-ui/core'
import RoomSummery from '../RoomSummery/RoomSummery'
import { PrimaryLineChart } from '../PrimaryLineChart/PrimaryLineChart';
import LightingController from '../LightingController/LightingController';
import MenuIcon from '@material-ui/icons/Menu';




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
    RoomSummeryContainer:{
        '@media (max-width: 550px)': {
            marginLeft:"-24px",
        },
        '@media (max-width: 450px)': {
            


        },
        '@media (max-width: 370px)': {

        }
    },
    roomTabWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "192px",
        minHeight: "442px",
        marginTop: "8px",
        position: "relative",
        '@media (max-width: 550px)': {
            marginLeft:"-24px",
        },
        '@media (max-width: 450px)': {
            


        },
        '@media (max-width: 370px)': {

        }

    },
    backgroundTab: {
        background: theme.palette.secondary.dark,
    },
    meterContainer: {
        // background:theme.palette.roomStatus.warning,
        minWidth: "128px",
        maxWidth: "256px",
        maxHeight: "512px",
        position: "relative",
    },

}));

const IndividualRoom = () => {
    const classes = useStyles();

    const [state, setState] = React.useState({ //setState
        Tabs: ["Analytics", "Lights", "Alarms", "Logs"],
        pick: 1,
    });

    //if true display menue if false display tabs
    const MenuOrTabs = useMediaQuery('(max-width:425px)');

    const handleTabChange = (event, newValue) => {
        setState({
            ...state,
            pick: newValue
        });
    }

    const options = [
        'warning',
        'FAULT',
        'All'];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setState({
            ...state,
            pick: event.target.value
        })
        setAnchorEl(null);
    };
    const ITEM_HEIGHT = 48;

    return (
        <Container className={"containerMain"}>
            <Grid container item direction={"column"} spacing={3}>
                <Grid item container direction={'row'} className={classes.RoomSummeryContainer}>
                    <RoomSummery />

                </Grid>
                <Grid item container direction={"column"} className={classes.roomTabWidget}>
                    <AppBar style={{ position: "absolute", top: "4px", left: "0px" }} className={classes.backgroundTab}>
                        {MenuOrTabs ? (
                            <Grid container item nowrap={"true"}>
                                <IconButton
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    aria-label="Widget Settings" color="primary" className={classes.iconButton}><MenuIcon /></IconButton>
                                <Typography style={{paddingLeft:"8px"}} variant={'h6'}>{state.Tabs[state.pick]}</Typography>
                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorEl}
                                    value={state.pick}
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        style: {
                                            maxHeight: ITEM_HEIGHT * 4.5,
                                            width: '20ch',
                                        },
                                    }}
                                >
                                    {state.Tabs.map((option, index) => (
                                        <MenuItem key={option} value={index} selected={option === 'Pyxis'} onClick={handleClose}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Grid>

                        ) : (<Tabs
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
                        </Tabs>)}

                    </AppBar>
                    <Grid item container direction={"row"} style={{paddingTop:"48px"}}>
                        <TabPanel value={state.pick} index={0} id={`scrollable-auto-tabpanel-${0}`}>
                            <PrimaryLineChart />
                        </TabPanel>
                        <TabPanel value={state.pick} index={1} id={`scrollable-auto-tabpanel-${1}`}>
                            <LightingController />
                        </TabPanel>
                        <TabPanel value={state.pick} index={2} id={`scrollable-auto-tabpanel-${2}`}>
                            Alarms Are currently in development. You will be able to set the alert levels for each datapoint monitored.
                        </TabPanel>
                        <TabPanel value={state.pick} index={3} id={`scrollable-auto-tabpanel-${3}`}>
                            Logs is currently in development. You will be able to view a list of alarts and alarms for this room.
                        </TabPanel>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default IndividualRoom;

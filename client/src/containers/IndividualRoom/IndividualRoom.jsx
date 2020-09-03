import React from 'react'
// import PropTypes from 'prop-types'
import { Container, Grid, makeStyles, withStyles, Tab, Tabs } from '@material-ui/core'
import RoomSummery from '../RoomSummery/RoomSummery'
import { PrimaryLineChart } from '../PrimaryLineChart/PrimaryLineChart';
import { LightingController } from '../LightingController/LightingController';
import requireAuth from '../../hoc/requireAuth';




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
    roomTabWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "256px",
        minHeight: "442px",
        marginTop: "8px",
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



export default requireAuth(function IndividualRoom() {
    const classes = useStyles();

    const [state, setState] = React.useState({ //setState
        Tabs: ["Analytics", "Lights", "Alarms", "Logs"],
        pick: 0,
    });

    // const handleChange = (event) => {
    //     console.log(state.pick)
    //     const name = event.target.name;
    //     // console.log(name);
    //     setState({
    //         ...state,
    //         [name]: event.target.value,
    //     });
    //     // props.setRoom(event.target.value);
    // };

    const handleTabChange = (event, newValue) => {
        setState({
            ...state,
            pick: newValue
        });
    }

    return (
        <Container className={"containerMain"}>
            <Grid container item direction={"column"} spacing={3}>
                <Grid item container direction={'row'}>
                    <RoomSummery />
                </Grid>
                <Grid item container direction={"column"} className={classes.roomTabWidget}>
                    <Grid item container direction={"row"} className={classes.backgroundTab}>
                        <Tabs value={state.pick} onChange={handleTabChange} aria-label={"handleRoom"}>
                            {state.Tabs.map((item, index) => {
                                return (
                                    <StyledTab label={item} key={index} id={`simple-tab-${index}`}
                                        aria-controls={`simple-tabpanel-${index}`} />);
                            })}
                        </Tabs>
                    </Grid>
                    <Grid item container direction={"row"}>
                        <TabPanel value={state.pick} index={0}>
                            <PrimaryLineChart />
                        </TabPanel>
                        <TabPanel value={state.pick} index={1}>
                            <LightingController />
                        </TabPanel>
                        <TabPanel value={state.pick} index={2}>
                            Alarms Are currently in development. You will be able to set the alert levels for each datapoint monitored.
                        </TabPanel>
                        <TabPanel value={state.pick} index={3}>
                            Logs is currently in development. You will be able to view a list of alarts and alarms for this room.
                        </TabPanel>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
})

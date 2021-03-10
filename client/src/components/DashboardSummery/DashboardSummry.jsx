import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector, shallowEqual } from "react-redux";
import { compose } from "redux";
import { VictoryPie, VictoryLabel } from "victory";
import { Grid, Typography, List } from "@material-ui/core"
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';
import { StandardRoundSelectForm } from "../StandardSelect/StandardSelect.js";
import { sampleTempData, sampleHumidityData, sampleProgressData, sampleCO2Data } from "../../exampleDataTypes/clientExamlpeDataTypes";
import './style.css';
// import VerticalDividerStyled from "../VerticalDivider/VerticalDivider"
import { getRooms, setRoom, setExampleRooms, pendingRooms } from "../../actions/roomActions";
import { resetPendingZones, resetZones } from "../../actions/LightZoneActions";
import { StartSession, FetchLiveData} from "../../actions/LiveData";



const useStyles = makeStyles((theme) => ({
    dashboardSummery: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "128px",
        width: "100%",
        '@media (max-width: 460px)': {
            maxWidth: "300px !important",
            minHeight: "1024px"

        },
        '@media (max-width: 400px)': {
            maxWidth: "256px !important",

        },
        '@media (max-width: 330px)': {
            maxWidth: "212px !important",

        },
        '@media (max-width: 280px)': {
            maxWidth: "192px !important",
            marginLeft: '-12px'

        }
    },
    Title: {
        '@media (max-width: 460px)': {
            fontSize: 18,

        },
        '@media (max-width: 400px)': {
            fontSize: 14,

        },
        '@media (max-width: 330px)': {
            fontSize: 12,

        }
    },
    formControl: {
        color: theme.palette.text.main,
        minHeight: "32px",
        maxHeight: "48px"
    },
    chartLabel: {
        // textAlign: 'center',
    },
    pieChart: {
        width: "160px",
        height: "160px",
        '@media (max-width: 460px)': {
            width: "128px !important",
            height: "128px !important",
        },
        '@media (max-width: 320px)': {
            width: "92px !important",
            height: "92px !important",

        }
    },
    "#bottomPieChart": {
        '@media (max-width: 330px)': {
            marginBottom: "256px",

        }
    },
    legendList: {
        paddingTop: "2px",
        paddingBottom: "2px"
    },
    legendColor: {
        height: "12px",
        width: "12px",
        marginRight: "12px"
    },
    legendItem: {
        paddingTop: "2px",
        paddingBottom: "2px",

    },
    legendText: {
        '@media (max-width: 460px)': {
            fontSize: 12
        },
        '@media (max-width: 320px)': {
            fontSize: 10
        }
    },
    Divider: {
        background: "white",
    },

    color: {
        background: theme.palette.roomStatus.veg
    },
    roomSelect: {
        '@media (max-width: 460px)': {
            fontSize: 12
        },
        '@media (max-width: 320px)': {
            fontSize: 10
        }
    }

}));

const DashboardPieChart = (props) => {
    const classes = props.classes;
    const labels = [];

    props.dataSet.map((item) => {
        labels.push(item.y);
        return item.y
    })
    let ExtraClass = props.ExtraClass;
    if (!ExtraClass) {
        ExtraClass = " "
    }

    return (
        // <Grid item xs={3}>
        <Grid container item direction="column" justify="center" alignItems="center" id={ExtraClass} style={{ paddingBottom: "12px" }} spacing={0} xs={12} sm={6} md lg>
            <Grid item xs>
                <Typography variant="subtitle2" className={classes.chartLabel}>{props.chartName}</Typography>
            </Grid>
            <Grid item xs className={classes.pieChart}>
                <VictoryPie
                    padAngle={({ datum }) => datum.y}
                    innerRadius={100}
                    colorScale={props.colorScale}
                    data={props.dataSet}
                    labels={({ datum }) => datum.y.toString()}
                    labelPlacement={({ index }) => index
                        ? "parallel"
                        : "vertical"}
                    style={{ labels: { fill: "white", fontSize: "32px" } }}
                    labelComponent={<VictoryLabel />}
                />
            </Grid>
            <Grid item xs>
                <List className={classes.legendList}>
                    {props.dataSet.map((item, index) => {
                        // console.log(props.colorScale);

                        return (<ListItem key={index} className={classes.legendItem}>
                            <div className={classes.legendColor} style={{ background: props.colorScale[index] }}></div> <Typography variant={"body2"} className={classes.legendText} >{item.catName}</Typography>
                        </ListItem>);
                    }
                    )}
                </List>
            </Grid>
            {/* </Grid> */}
        </Grid>);
}

DashboardSummary.propTypes = {
    chartName: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    dataSet: PropTypes.arrayOf(PropTypes.object),
    colorScale: PropTypes.arrayOf(PropTypes.object),
}

function DashboardSummary(props) {
    const classes = useStyles();
    const theme = useTheme();
    const defaultColorScale = [theme.palette.roomStatus.warning, theme.palette.primary.main, theme.palette.roomStatus.veg];
    const progressColorScale = [theme.palette.roomStatus.clone, theme.palette.roomStatus.veg, theme.palette.roomStatus.flower];


    let { rooms, pick, user, pending, locationIndex, session, serror, live } = useSelector(state => ({
        rooms: state.growRooms.rooms,
        pick: state.growRooms.roomIndex,
        user: state.users.user,
        locationIndex: state.users.activeLocation,
        pending: state.growRooms.pending,
        session: state.growRooms.session,
        serror: state.growRooms.errorMessage,
        live:   state.growRooms.Live,


    }), shallowEqual)


    // When the global state changes decide if we send example data or load db data
    useEffect(() => {
        // console.log(pending !== true && user !== undefined && rooms[0].ownerID === undefined)
        // console.log(user)
        // console.log(rooms)
        if (pending !== true && user !== undefined && rooms[0].name !== undefined) {
            if (user.example) {
                props.setExampleRooms()
                props.pendingRooms()
            } else if (user.UID !== undefined && rooms[0].name !== undefined) {
                // console.log("getting rooms")
                props.getRooms(user, locationIndex)
                props.pendingRooms()
            }
        }
        //check if rooms are present in the state and ensure no session exists
        if (pending && rooms.length > 0 && rooms[0].name !== "Loading rooms" && rooms[0].name !== undefined && session.sessionID === undefined && !session.message) {
            console.log('start live data session')
            //used for managing session
            let deviceIDList = [];
            let UID_FOR_SESSION = ""
            rooms.forEach((item) => {
                deviceIDList.push(item.doc)
            })
            if (user.accountOwner) {
                UID_FOR_SESSION = user.accountOwner;
            } else {
                UID_FOR_SESSION = user.UID;
            }
            console.log(deviceIDList)
            props.StartSession(UID_FOR_SESSION, deviceIDList);
            // props(UID_FOR_SESSION, deviceIDList);
        }
        //if session already exists but might be expired rooms must also be present
        if (pending && rooms.length > 0 && rooms[0].name !== "Loading rooms" && rooms[0].name !== undefined && session.sessionID && session.expTime && session.expTime < Date.now() / 1000) {
            console.log('restarting live data session')
            //used for managing session
            let deviceIDList = [];
            let UID_FOR_SESSION = ""
            rooms.forEach((item) => {
                deviceIDList.push(item.doc)
            })
            if (user.accountOwner) {
                UID_FOR_SESSION = user.accountOwner;
            } else {
                UID_FOR_SESSION = user.UID;
            }
            console.log(deviceIDList)
            props.StartSession(UID_FOR_SESSION, deviceIDList);
        }

        //if session exists get Live data for every Room
        if(pending && rooms.length > 0 && rooms[0].name !== "Loading rooms" && rooms[0].name !== undefined && session.sessionID && session.expTime && !live.live){
            console.log('getting live data')
            rooms.forEach((item) => {
                props.FetchLiveData(item.doc, live)
            })
            
        }

    })

    //check if data has loaded and if not display loading text
    if (rooms === undefined || rooms.length === 0) {
        rooms = [
            {
                name: "Loading rooms",
                tempSetPoint: 72,
                humiditySetPoint: 44,
                CO2SetPoint: 3000,
                pressureSetPont: 1114,
                stage: "loading",
                dateStarted: 1597017600,
                CloneTime: 864000,
                VegTime: 3024000,
                FlowerTime: 2419200,
            },
        ]
        pick = 0;
    }

    const generateTempData = () => {

        return sampleTempData;


        // if(user.example){
        //     return sampleTempData;
        // }
        // console.log("generating Temp data")
        // let nominal = 0;
        // let warning = 0;
        // let fault = 0;
        // for(let i = 0; i<rooms.length; i++){
        //     let item = rooms[i];
        //     console.log(item)
        //     if(item.tempC<item.tempMax && item.tempC>item.tempMin){
        //         console.log(i)
        //         nominal++;
        //         continue;

        //     }
        //     if(item.tempC>item.tempMax && item.tempC<item.tempMax+10|| item.tempC<item.tempMin && item.tempC>item.tempMin-10){
        //         console.log(i)
        //         warning++;
        //         continue;
        //     }
        //     if(item.tempC>item.tempMax+10 ||item.tempC<item.tempMin-10){
        //         console.log(i)
        //         fault++
        //         continue;
        //     }
        // }
        // return [{ x: "Fault", y: fault, catName: "Fault" },
        // { x: "Warning", y: warning, catName: "Warning" },
        // { x: "Nominal", y: nominal, catName: "Nominal" }];
    }

    const handleChange = (event) => {
        props.setRoom(event.target.value);
        props.resetPendingZones();
        props.resetZones();
    };

    return (
        <Grid container direction="row" justify={"center"} spacing={2} className={`${classes.dashboardSummery} `} >
            {/* <Grid container item direction="row" xs style={{maxHeight:"128px"}}> */}
            <Grid item xs={12} sm={8} md={9} lg={10} style={{ paddingLeft: "24px" }}>
                <Typography variant={"h5"} className={classes.Title}>Summary</Typography>
            </Grid>
            {/* <Grid item xs={0} sm={4}  md={4}></Grid> */}
            <Grid item xs={12} sm={4} md={3} lg={2}>
                <StandardRoundSelectForm className={classes.formControl} >

                    <Select
                        value={pick}
                        onChange={handleChange}
                        inputProps={{
                            name: 'pick',
                            id: 'Room-Name'
                        }}
                        defaultValue={0}
                        className={classes.roomSelect}
                    >
                        {rooms.map((Item, Index) => (
                            <MenuItem key={Index} value={Index} className={classes.roomSelect}>{Item.name}</MenuItem>
                        ))}
                    </Select>
                </StandardRoundSelectForm>
            </Grid>
            {/* </Grid> */}

            {/* ========= charts start here =================================*/}
            {/* <VerticalDividerStyled orientation={'vertical'} flexItem /> */}
            <DashboardPieChart chartName={"Temp"} classes={classes} theme={theme} dataSet={generateTempData()} colorScale={defaultColorScale} />
            {/* <VerticalDividerStyled orientation={'vertical'} flexItem /> */}
            <DashboardPieChart chartName={"Humidity"} classes={classes} theme={theme} dataSet={sampleHumidityData} colorScale={defaultColorScale} />
            {/* <VerticalDividerStyled orientation={'vertical'} flexItem /> */}
            <DashboardPieChart chartName={"CO2"} classes={classes} theme={theme} dataSet={sampleCO2Data} colorScale={defaultColorScale} />
            {/* <VerticalDividerStyled orientation={'vertical'} flexItem /> */}
            <DashboardPieChart chartName={"Progress"} classes={classes} theme={theme} dataSet={sampleProgressData} colorScale={progressColorScale} ExtraClass={"#bottomPieChart"} />
            {/* <Grid container item direction="row" xs >
                
            </Grid>
            <Grid container item direction={"row"} xs>

            </Grid> */}
        </Grid>
    )
}

DashboardSummary.propTypes = {

}

const dashboardActions = {
    getRooms: getRooms,
    setRoom: setRoom,
    setExampleRooms: setExampleRooms,
    pendingRooms: pendingRooms,
    resetPendingZones: resetPendingZones,
    resetZones: resetZones,
    StartSession: StartSession,
    FetchLiveData: FetchLiveData
}

function mapStateToProps({ state }) {
    return { state };
}

const formedComponent = compose(
    connect(mapStateToProps, dashboardActions)
)(DashboardSummary);

export default formedComponent;
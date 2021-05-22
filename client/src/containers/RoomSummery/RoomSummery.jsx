import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import moment from "moment";
import { connect, useSelector, shallowEqual } from 'react-redux';
import { compose } from "redux";
import { makeStyles, useTheme } from '@material-ui/core/styles'; //useTheme
import {
    Grid, Typography, Select, MenuItem, ListItemText, List, ListItem, ListItemIcon, Button, Modal, Backdrop, Fade,
    Box, IconButton, Snackbar, CircularProgress, useMediaQuery 
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import ReactSpeedometer from "react-d3-speedometer"
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import { StandardRoundSelectForm } from "../../components/StandardSelect/StandardSelect.js";
import CancelIcon from '@material-ui/icons/Cancel';
// import VerticalDividerStyled from "../../components/VerticalDivider/VerticalDivider";

//custom components
import FieldMeter from "../../components/RoomMeter/RoomMeter"
import {FieldMeterLegend} from "../../components/RoomMeter/RoomMeter";

//Redux actions
import { getRooms, setRoom, setExampleRooms, pendingRooms, updateRooms } from "../../actions/roomActions";
import { resetPendingZones, resetZones } from "../../actions/LightZoneActions";
import { StartSession, FetchLiveData} from "../../actions/LiveData";
//firebase stuff
// import { db } from "../../consts/firebase";

function DiagnosticColorBar(props) {
    const theme = useTheme();
    let color = theme.palette.roomStatus.nominal;
    let top = props.top || "60%";
    let left = props.left || "10%";
    let msg = "nominal";
    let iconMsg = <CheckCircleIcon style={{ color: color }} />;
    // console.log(` supermin ${props.superMax} < value: ${props.datapoint} < max ${props.max}`);
    // console.log(` supermin ${props.superMin} > value: ${props.datapoint} < min ${props.min}`);
    if ((props.superMax > props.datapoint && props.datapoint > props.max) || (props.superMin < props.datapoint && props.datapoint < props.min)) {
        color = theme.palette.primary.main;
        msg = "Warning";
        iconMsg = <HelpIcon style={{ color: color }} />;
    }
    // console.log(props.datapoint > props.superMax);
    // console.log(props.datapoint < props.superMin)
    if (props.datapoint > props.superMax || props.datapoint < props.superMin) {
        color = theme.palette.roomStatus.warning;
        msg = "FAULT";
        iconMsg = <ErrorIcon style={{ color: color }} />;
    }

    return (
        <List style={{
            position: "absolute",
            top: top,
            left: left,
        }}>
            <ListItem key={1}>
                <ListItemText variant={"button"}>SetPoint:</ListItemText>
                <Button variant="outlined" color={"primary"} onClick={props.handleOpen} style={{ marginLeft: "12px" }}>

                    {props.setPoint}
                </Button>

            </ListItem>
            <ListItem key={2}>
                {/* <div style={{
                    backgroundColor: color,
                    height: height,
                    width: width,
                    borderRadius: "50%",
                    marginRight: "128px"
                }}></div> <span variant={"caption"}>{msg}</span> */}
                <ListItemIcon>{iconMsg}</ListItemIcon>
                <ListItemText primary={msg} />
            </ListItem>
        </List>
    );
}
DiagnosticColorBar.propTypes = {
    datapoint: PropTypes.number.isRequired,
    setPoint: PropTypes.string.isRequired,
    min: PropTypes.number.isRequired,
    superMin: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    superMax: PropTypes.number.isRequired,
}


function StageMeter(props) {
    // const state = props.state;
    const classes = props.classes;
    const rooms = props.rooms;
    const pick = props.pick;

    const theme = props.theme;
    const cloneHours = (rooms[pick].CloneTime / 60) / 60;
    const vegHours = (rooms[pick].VegTime / 60) / 60;
    const flowerHours = (rooms[pick].FlowerTime / 60) / 60;
    const TotalDays = (cloneHours) / 24 + (vegHours) / 24 + (flowerHours) / 24
    // console.log(` ${cloneHours} ${vegHours} ${flowerHours} ${TotalDays}`)
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    //Label stuff
    const [Labels, setLabels] = React.useState([{}, {}, {}]);


    const handleMouseEnter = () => {
        setLabels([{
            text: `${(cloneHours) / 24}`,
            fontSize: "12px",
            color: "white"
        }, {
            text: `${(vegHours) / 24}`,
            fontSize: "12px",
            color: "white"
        },
        {
            text: `${(flowerHours) / 24}`,
            fontSize: "12px",
            color: "white"
        }])
    }
    const handleMouseLeave = () => {
        setLabels([{}, {}, {}])
    }

    return (
        <Grid container item sm={12} md={6} lg={3} direction={'column'} justify={'center'} style={{paddingBottom:"24px",minWidth:"192px", maxWidth:"320px"}}>
            <Typography variant={"h6"} align={'center'}>Life Stage</Typography>
            <Grid item xs className={classes.meterContainer}>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <ReactSpeedometer
                        forceRender
                        width={props.width}
                        needleTransitionDuration={2000}
                        needleTransition="easeElastic"
                        needleHeightRatio={0.7}
                        value={32}
                        minValue={0}
                        maxValue={TotalDays}//state.rooms[state.pick].CloneTime +state.rooms[state.pick].VegTime+state.rooms[state.pick].FlowerTime
                        segments={5}
                        currentValueText={`${32} days`}
                        customSegmentStops={[0, (cloneHours) / 24, (vegHours) / 24, TotalDays]}
                        segmentColors={[theme.palette.roomStatus.clone, theme.palette.roomStatus.veg, theme.palette.roomStatus.flower]}
                        customSegmentLabels={Labels} />
                </div>
                <FieldMeterLegend left={"5%"} handleOpen={handleOpen} datapoint={2} min={1} superMin={0}
                    max={3} superMax={4} setPoint={rooms[pick].stage + " left in"} />
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
                            <Grid item container direction={"column"} className={classes.setPointWidget}>
                                <Grid item container direction={"row"}>
                                    <Grid item xs> </Grid>
                                    <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                                </Grid>
                                <Grid item container direction={"row"}>
                                    <Grid item ><h3 id="transition-modal-title">Adjust</h3></Grid>
                                    <Grid item xs> </Grid>
                                    <Grid item> <h4>Growth Stage</h4></Grid>
                                </Grid>
                                <Grid item container direction={"row"} className={classes.sliderRow}>
                                    <Typography variant={'h5'}>Adjusting staging values is not allowed at this time</Typography>
                                </Grid>
                                <Grid item container direction={"row"}>
                                    <Button variant={"outlined"} color={"primary"} disabled>
                                        Set
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </Grid>
        </Grid>
    );
};


const useStyles = makeStyles((theme) => ({
    roomSummeryWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "192px",
        minHeight: "360px",
        height: "auto",
        '@media (max-width: 460px)': {
            maxWidth: "300px",
            paddingBottom:"48px"
        },
        '@media (max-width: 400px)': {
            maxWidth: "256px",

        },
        '@media (max-width: 330px)': {
            maxWidth: "212px",
            
        }
    },
    iconButton: {
        color: "white",
    },
    meterContainer: {
        // background:theme.palette.roomStatus.warning,
        minWidth: "64px",
        maxWidth: "256px",
        minHeight:"256px",
        maxHeight: "320px",
        position: "relative",
        '@media (max-width: 400px)': {
            minHeight: "300px",

        },
    },
    ReactMeter: {
        // -webkit-filter: grayscale(100%);
        // -moz-filter: grayscale(100%);
        // -ms-filter: grayscale(100%);
        // -o-filter: grayscale(100%);
        // filter: url(grayscale.svg);
        /* Firefox 4+ */
        // filter: gray;
        //  /* IE 6-9 */;
        "& :hover": {

        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "scroll",
    },
    paper: {
        display:"flex",
        flexGrow:1,
        position: "absolute",
        minWidth: "330px",
        maxWidth: "704px",
        width:"70vw",
        color: theme.palette.text.main,
        background: "url('https://cdn.discordapp.com/attachments/370759274621698048/755271571181928459/unknown.png')",
        backgroundColor: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.secondary.dark}`,
        boxShadow: theme.shadows[5],
        padding: "12px",
        '@media (max-width: 550px)': {
            minWidth:"64px",
            maxWidth: "320px",

        },
        '@media (max-width: 400px)': {
            maxWidth: "256px",

        },
        '@media (max-width: 330px)': {
            minWidth:"192px",
            maxWidth: "256px",

        }
    },
    setPointWidget: {
        paddingTop: "0px",
        // padding: "24px",
        
    },
    sliderRow: {
        marginTop: "32px",
        marginBottom: "32px",
        padding: "12px",
        paddingRight:"48px",
        background: theme.palette.secondary.dark,
        borderRadius: "12px",
        width:"98%",
        '@media (max-width: 550px)': {
            maxWidth: "320px",

        },
        '@media (max-width: 400px)': {
            

        },
        '@media (max-width: 330px)': {
            // minWidth: "204px",
            // marginLeft:"-12px"

        }
        // border:`solid 2px ${theme.palette.secondary.dark}`
    },
    input: {
        marginTop: "24px",
        background: theme.palette.secondary.main,
    }

}));

function RoomSummery(props) {
    const classes = useStyles();
    const theme = useTheme();

    let F = props.UseF || true;

    const fLogo = " °F";
    const cLogo = " °C"
    let tempUnitString = fLogo;
    if (!F) {
        tempUnitString = cLogo;
    }

    let { rooms, pick, user, pending, locationIndex, session, serror, live } = useSelector(state => ({
        rooms: state.growRooms.rooms,
        pick: state.growRooms.roomIndex,
        user: state.users.user,
        pending: state.growRooms.pending,
        locationIndex: state.users.activeLocation,
        session: state.growRooms.session,
        serror: state.growRooms.errorMessage,
        live:   state.growRooms.Live,

    }), shallowEqual)

    // console.log(rooms)
    useEffect(() => {
        // console.log(pending !== true && user.UID !== undefined && rooms[0].ownerID === undefined)
        if (pending !== true && user !== undefined && rooms[0].ownerID === undefined) {
            if (user.example) {
                props.setExampleRooms()
                props.pendingRooms()
            } else if (user.UID !== undefined && rooms[0].ownerID === undefined) {
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
    let loading = false;
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
        loading=true;
    }

    const [state, setState] = React.useState({ //setState
        liveData: {
            temp: 74,
            humidity: 45,
            CO2: 2988,
            pressure: 1114
        },
        StageMeter: false,
        errorMsg: "",
        invalidAlert: false,
        alertType: "error"

    });

    const handleInvalidAlertClose = () => {
        setState({
            ...state,
            invalidAlert: false
        });
    };

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
    let ButtonText = "Show Pressure Meter";
    if(!state.StageMeter){
        ButtonText = "Show Stage Meter";
    }

    const handleChange = (event) => {
        // console.log(name);
        
        props.setRoom(event.target.value)
            props.resetPendingZones();
            props.resetZones();

        
        // tempMeterRef.current.updateState()
    };

    const handleRightShift = () => {
        if (state.StageMeter) {
            setState({
                ...state,
                StageMeter: false
            });
        } else {
            setState({
                ...state,
                StageMeter: true
            });
        }
    }

    const smallMeter = useMediaQuery('(max-width:430px)');
    // const smallerMeter = useMediaQuery('(max-width:430px)');
    let meterWidth = 256;
    if(smallMeter){
        meterWidth = 192;
    }
    let LiveData = {};
    if(rooms && live.live && live.live[rooms[pick].doc]){
        console.log(live.live[rooms[pick].doc])
        LiveData["temp"] = live.live[rooms[pick].doc].temp || 0;
        LiveData["rh"] = live.live[rooms[pick].doc].rh || 0;
        LiveData["co2"] = live.live[rooms[pick].doc].co2 || 0;
        LiveData["vpd"] = live.live[rooms[pick].doc].vpd || 0;
    }

    if(!LiveData['temp'] || !LiveData["rh"] || !LiveData["co2"] || !LiveData["vpd"]){
        LiveData["temp"] =  0;
        LiveData["rh"] = 0;
        LiveData["co2"] = 0;
        LiveData["vpd"] = 0;
    }


    return (
        <Grid item container direction={"column"} className={classes.roomSummeryWidget} spacing={3}>
            <Grid container item direction="row" xs>
                <Grid item xs style={{ paddingLeft: "24px" }}>
                    <Typography variant={"h4"}>Summary</Typography>
                </Grid>
                <Grid item xs ></Grid>
                <Grid item style={{ paddingLeft: "24px" }}>
                    <StandardRoundSelectForm className={classes.formControl} hiddenLabel >

                        <Select
                            value={pick}
                            onChange={handleChange}
                            inputProps={{
                                name: 'pick',
                                id: 'Room-Name',
                            }}
                        >
                            {rooms.map((Item, Index) => (
                                <MenuItem key={Index} value={Index}>{Item.name}</MenuItem>
                            ))}
                        </Select>
                    </StandardRoundSelectForm>
                </Grid>
            </Grid>
            <Grid item container direction={'row'} spacing={1} style={{marginTop:"48px"}}>
                {/* <Grid item container direction={"column"} xs lg> */}
                {loading ? (<CircularProgress color={"primary"} />) :
                    (
                        <Grid item container direction={'row'} xs={12} justify={'center'}>
                            <FieldMeter state={state} rooms={rooms} pick={pick} theme={theme} classes={classes}
                                type={"temp"} userType={user.accountType} LiveValue={LiveData.temp}
                                title={"Temp"}
                                longTitle={"Temperature"}
                                setpoint={rooms[pick].tempSetPoint}
                                min={rooms[pick].tempMin} width={meterWidth}
                                max={rooms[pick].tempMax}
                                UnitString={tempUnitString} handleAlertOpen={handleAlertOpen} setRoom={updateRooms} />

                            <FieldMeter state={state} rooms={rooms} pick={pick} theme={theme} classes={classes} LiveValue={LiveData.rh}
                                type={"humidity"} title={"Humidity"} longTitle={"Humidity"} width={meterWidth} userType={user.accountType}
                                setpoint={rooms[pick].humiditySetPoint} min={rooms[pick].humidityMin} max={rooms[pick].humidityMax}
                                UnitString={" %"} handleAlertOpen={handleAlertOpen} setRoom={updateRooms} />

                            <FieldMeter state={state} rooms={rooms} pick={pick} theme={theme} classes={classes} LiveValue={LiveData.co2}
                                type={"CO2"} title={"CO2 Level"} longTitle={"CO2 level"} width={meterWidth} userType={user.accountType}
                                setpoint={rooms[pick].CO2SetPoint} min={rooms[pick].CO2Min} max={rooms[pick].CO2Max}
                                UnitString={" ppm"} handleAlertOpen={handleAlertOpen} setRoom={updateRooms} />

                            {state.StageMeter ?
                                (<StageMeter state={state} rooms={rooms} pick={pick} theme={theme} width={meterWidth} classes={classes} handleAlertOpen={handleAlertOpen} setRoom={updateRooms} />) :

                                (<FieldMeter state={state} rooms={rooms} pick={pick} theme={theme} classes={classes} LiveValue={LiveData.vpd}
                                    type={"pressure"} title={"VPD"} longTitle={"Variable Pressure Deficit"} width={meterWidth} userType={user.accountType}
                                    setpoint={rooms[pick].pressureSetPoint} min={rooms[pick].pressureMin} max={rooms[pick].pressureMax}
                                    UnitString={" mbar"} handleAlertOpen={handleAlertOpen} setRoom={updateRooms} />
                                )}
                        </Grid>
                    )}
                {/* </Grid> */}
                <Grid item container direction={'column'} justify={"center"} xs >
                        
                </Grid>
                <Grid item container direction={'column'} justify={"center"} xs={12} sm={3}>
                        <Button variant="outlined" color={"primary"} onClick={handleRightShift}>{ButtonText}</Button>
                </Grid>
            </Grid>
            <Snackbar open={state.invalidAlert} autoHideDuration={6000} onClose={handleInvalidAlertClose}>
                <Alert onClose={handleInvalidAlertClose} severity={state.alertType}>
                    {state.errorMsg}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

const roomSummeryActions = { 
    getRooms: getRooms,
    setRoom: setRoom,
    setExampleRooms: setExampleRooms,
    pendingRooms: pendingRooms, 
    updateRooms:updateRooms, 
    resetPendingZones: resetPendingZones, 
    resetZones: resetZones ,
    StartSession:StartSession,
    FetchLiveData:FetchLiveData
}

function mapStateToProps({ state }) {
    return { state };
}

const formedComponent = compose(
    connect(mapStateToProps, roomSummeryActions)
)(RoomSummery);

export default formedComponent;
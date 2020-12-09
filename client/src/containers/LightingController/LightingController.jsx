import React, { useState, useEffect } from 'react';
import { connect, useSelector, shallowEqual } from "react-redux";
import { compose } from "redux";
import moment from "moment";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'; //
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { Grid, TextField, makeStyles, useTheme, withStyles, Slider, Typography, Button, Divider, IconButton, Backdrop, Modal, Fade, Box, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';


//icons
// import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import WavesIcon from '@material-ui/icons/Waves';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CancelIcon from '@material-ui/icons/Cancel';
//my imports 
import { fetchZones, pendingZones, setExampleZones, resetPendingZones, updateZones } from "../../actions/LightZoneActions";

//firebase
import { db } from "../../consts/firebase";


function valuetext(value) {
    return `${value}%`;
}

//calc(-50% + 4px)

const PowerIntensitySlider = withStyles({
    root: {
        color: '#52af77',
    },
    thumb: {
        height: 48,
        width: 56,
        backgroundColor: '#fff',
        border: '2px solid black',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: '48px',
    },
    track: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    vertical: {
        minHeight: "192px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(white, black)',
            borderRadius: " 0 0 24px 24px",
        },
        "& .MuiSlider-rail": {
            width: 30,
            background: 'linear-gradient(white, black)',
            borderRadius: "24px",
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        },
        "& .MuiSlider-thumb": {
            // marginTop: -320,
            marginLeft: -12,
            border: '2px solid #2D2F33',
            color: "black"
        }
    }
})(Slider);

const RedIntensitySlider = withStyles({
    root: {
        color: '#52af77',
    },
    thumb: {
        height: 48,
        width: 56,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: '48px',
    },
    track: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    vertical: {
        minHeight: "192px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(red, black)',
            borderRadius: " 0 0 24px 24px",
        },
        "& .MuiSlider-rail": {
            width: 30,
            background: 'linear-gradient(red, black)',
            borderRadius: "24px",
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        },
        "& .MuiSlider-thumb": {
            marginTop: -320,
            marginLeft: -12,
            border: '2px solid #2D2F33',
            color: "black"
        }
    }
})(Slider);
const YellowIntensitySlider = withStyles({
    root: {
        color: '#52af77',
    },
    thumb: {
        height: 48,
        width: 56,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: '48px',
    },
    track: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    vertical: {
        minHeight: "192px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(yellow, black)',
            borderRadius: " 0 0 24px 24px",
        },
        "& .MuiSlider-rail": {
            width: 30,
            background: 'linear-gradient(yellow, black)',
            borderRadius: "24px",
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        },
        "& .MuiSlider-thumb": {
            marginTop: -320,
            marginLeft: -12,
            border: '2px solid #2D2F33',
            color: "black"
        }
    }
})(Slider);
const BlueIntensitySlider = withStyles({
    root: {
        color: '#52af77',

    },
    thumb: {
        height: 48,
        width: 56,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        // marginTop: -8,
        // marginLeft: -32,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: '48px',
    },
    vertical: {
        minHeight: "192px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(blue, black)',
            borderRadius: " 0 0 24px 24px",
        },
        "& .MuiSlider-rail": {
            width: 30,
            background: 'linear-gradient(blue, black)',
            borderRadius: "24px",
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        },
        "& .MuiSlider-thumb": {
            marginTop: -320,
            marginLeft: -12,
            border: '2px solid #2D2F33',
            color: "black"
        }

    }
})(Slider);



const ZoneSearchInput = withStyles((theme) => ({

    root: {
        background: theme.palette.secondary.dark,
        color: theme.palette.text.main,
        minWidth:"92px"
    },

}))(TextField);


const useStyles = makeStyles((theme) => ({
   
    
    lightZoneWidget: {
        background: theme.palette.secondary.dark,
        color: theme.palette.text.main,
        minWidth: "192px",
        maxWidth: "320px",
        maxHeight: "348px",
    },
    lightZoneHeader:{
        '@media (max-width: 550px)': {
            
            fontSize:"20px"
        },
        '@media (max-width: 450px)': {
            fontSize:"18px"
        },
        '@media (max-width: 370px)': {
            fontSize:"16px"
        }
    },
    lightZoneButtonBox: {
        border: "solid white 2px",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        position: "relative",
    },
    agGridContainer:{
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
    agGrid:{
        minHeight: '300px', 
        minWidth: '128px', 
        width: "98%",
        '@media (max-width: 550px)': {
            width:"94%"

        },
        '@media (max-width: 450px)': {
          width:"64vw"  
        },
        '@media (max-width: 370px)': {
            
        }
        
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow:"scroll",
    },
    paper: {
        position: "absolute",
        minWidth: "512px",
        color: theme.palette.text.main,
        backgroundColor: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.secondary.dark}`,
        boxShadow: theme.shadows[5],
        padding: "12px",
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
    sliderRow: {
        marginTop: "32px",
        marginBottom: "32px",
        padding: "48px",
        background: theme.palette.secondary.dark,
        borderRadius: "12px",
        // border:`solid 2px ${theme.palette.secondary.dark}`
    },
    topCaption: {
        height: "24px",
        marginTop: "8px",
        marginLeft: "8px"
    },
    RGBSliders:{
        marginLeft: "48px", 
        marginBottom: "24px",
        '@media (max-width: 370px)': {
            marginLeft:"0px",

        }
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },

}));



const PowerIntensity = (props) => {
    const classes = useStyles();
    const defaultValue = props.value
    // const [value, setValue] = React.useState(defaultValue);

    const topCaption = props.topCaption || "Power";
    const type = props.type || 0;
    // const bottomHeading = props.bottomHeading || "Intensity";
    // const color = props.color || "white";

    const handleSliderChange = (event, newValue) => {
        // setValue(newValue);
        props.setFunc(newValue);
    };

    const ThumbComponent = (props) => {
        return (
            <span {...props}>
                {defaultValue}
            </span>
        );
    }

    const typeOptions = [
        <PowerIntensitySlider
            orientation="vertical"
            value={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={false}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />,
        <RedIntensitySlider
            orientation="vertical"
            value={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={false}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />,
        <YellowIntensitySlider
            orientation="vertical"
            value={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={false}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />,
        <BlueIntensitySlider
            orientation="vertical"
            value={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={false}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />
    ]

    return (
        <Grid item container direction={"column"} xs>
            <Grid item className={classes.topCaption}>
                <Typography variant={"caption"} >{topCaption}</Typography>
            </Grid>
            <Grid item container className={classes.sliderBackround} direction={"row"} align={"center"}>
                <Grid item style={{ minHeight: "192px", marginTop: "24px", marginLeft: "24px", }}>
                    <div style={{ minHeight: "192px" }}>
                        {typeOptions[type]}
                    </div>
                </Grid>
            </Grid>
            {/* <Grid item container direction={"row"} justify={"center"}>
                <Grid item className={classes.SliderBottomLabel}>

                    <Button style={{ color: color }}><Typography variant={"button"} align={"center"} >set {bottomHeading}</Typography></Button>
                </Grid>
            </Grid> */}

        </Grid>
    );
}

const RGBInensities = (props) => {
    // const { red, yellow, blue } = props;
    const setR = (number) => {
        props.setState({
            ...props.state,
            spectrum: [number, props.state.spectrum[1], props.state.spectrum[2]],
        })
    }
    const setY = (number) => {
        props.setState({
            ...props.state,
            spectrum: [props.state.spectrum[0], number, props.state.spectrum[2]],
        })
    }

    const setB = (number) => {
        props.setState({
            ...props.state,
            spectrum: [props.state.spectrum[0], props.state.spectrum[1], number],
        })
    }
    return (
        <Grid item container direction={"row"} xs={5} wrap={'nowrap'} className={props.RGBSliders}>
            <PowerIntensity type={1} value={props.state.spectrum[0]} setFunc={setR} topCaption={"Color Spectrum"} bottomHeading={"Red"} color={"red"} />
            <Divider orientation={"vertical"} flexItem></Divider>
            <PowerIntensity type={2} value={props.state.spectrum[1]} setFunc={setY} topCaption={" "} bottomHeading={"Yellow"} color={"yellow"} />
            <Divider orientation={"vertical"} flexItem></Divider>
            <PowerIntensity type={3} value={props.state.spectrum[2]} setFunc={setB} topCaption={" "} bottomHeading={"Blue"} color={"blue"} />
        </Grid>
    );
};


const activeIndicator = (props) => {
    const active = props.value;
    // const { nominal, fault } = props;

    const mainStyle = {
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        margin: "8px"
    }

    switch (active) {
        case true:
            return (<div style={{ ...mainStyle, background: "#31B461" }}></div>);
        default:
            return (<div style={{ ...mainStyle, background: "#121315" }}></div>)
    }
};

const createTimeStr = (string) => {
    // console.log(`============= ${string} ===================`)
    let stringArray = string.split(":")
    if(stringArray.length > 1){
        return `${stringArray[0]}:${stringArray[1]}`;
    }else{
        let hour = string.slice(0,2);
        let minute = string.slice(2,4);
        return `${hour}:${minute}`;
    }
    

}

const calcTotalUptime = (timeA, timeB) => {
    let timeArrayA = timeA.split(":");
    let timeArrayB = timeB.split(":");
    let now, then;
    if(timeArrayA.length>1 && timeArrayB.length>1){
        now = moment().hour(timeArrayA[0]).minute(timeArrayA[1]);
        // console.log(now)
        then = moment().hour(timeArrayB[0]).minute(timeArrayB[1]);
        if(timeArrayB[0]<timeArrayA[0]){
            then.add(1,"day")
        }
    }else{
        let HoursA = parseInt(timeA.slice(0,2))
        let HoursB = parseInt(timeB.slice(0,2))
        let MinuteA = parseInt(timeA.slice(2,4))
        let MinuteB = parseInt(timeB.slice(2,4))
        now = moment().hour(HoursA).minute(MinuteA);
        // console.log(now)
        then = moment().hour(HoursB).minute(MinuteB);
        if(HoursB<HoursA){
            then.add(1,"day")
        }
    } 
    // console.log(then)
    let ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
    let d = moment.duration(ms);
    return d.humanize();
}




const LightingController = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    let { rooms, pick, user, lightZones, pending } = useSelector(state => ({
        rooms: state.growRooms.rooms,
        pick: state.growRooms.roomIndex,
        user: state.users.user,
        lightZones: state.LightZones.zoneArray,
        pending: state.LightZones.pendingZones

    }), shallowEqual)


    useEffect(() => {
        // console.log(pending !== true && user !== undefined && rooms[0].ownerID === undefined)
        // console.log(user)
        if (pending !== true && user !== undefined && rooms[pick] !== undefined) {
            if (user.example) {
                props.setExampleZones()
            } else if (user.UID !== undefined && rooms[pick].Zones !== undefined) {
                console.log("fetching zones from db")
                props.fetchZones(rooms[pick])
                props.pendingZones()
            }
        }


    })


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
    // console.log(lightZones.length)
    //check if zones are undefined and put loading data

    if (lightZones.length === 0) {
        if (rooms.Zones === undefined) {
            lightZones = [
                {
                    id: 1,
                    example: true,
                    name: "No Zones set up in this room",
                    active: false,
                    activeCount: 0,
                    fault: 0,
                    intensity: 50,
                    red: 50,
                    yellow: 50,
                    blue: 50,
                    timeOn: "NaN",
                    timeOff: "NaN",
                    dateFirstStarted: 0,
                    totalRuntime: 0
                },
            ]
        }
        else {
            lightZones = [
                {
                    id: 1,
                    example: true,
                    name: "Loading Zones",
                    active: false,
                    activeCount: 6,
                    fault: 0,
                    intensity: 50,
                    red: 50,
                    yellow: 50,
                    blue: 50,
                    timeOn: "1111",
                    timeOff: "1111",
                    dateFirstStarted: 0,
                    totalRuntime: 0
                },
            ]
        }

    }



    const [state, setState] = useState({
        currentZone: 0,
        selectedZones: [],
        spectrumModal: false,
        powerModal: false,
        scheduleModal: false,
        spectrum: [50, 50, 50],
        power: 50,
        timeOn: "",
        timeOff: "",
        totalUptimePerDay:"",
        errorMsg: "",
        invalidAlert: false,
        alertType: "error"

    });

    //dateHandlers

    //snackbar alert system
    const handleInvalidAlertClose = () => {
        setState({
            ...state,
            invalidAlert: false
        });
    };
    const handleAlertOpen = (msg, type, closeModals) => {
        if (type === "success") {
            // console.log("successAlert")
            if (closeModals) {
                setState({
                    ...state,
                    spectrumModal: false,
                    powerModal: false,
                    scheduleModal: false,
                    errorMsg: msg,
                    invalidAlert: true,
                    alertType: "success"
                });
            } else {
                setState({
                    ...state,
                    errorMsg: msg,
                    invalidAlert: true,
                    alertType: "success"
                });
            }

        } else {
            // console.log("error alert")
            if (closeModals) {
                setState({
                    ...state,
                    spectrumModal: false,
                    powerModal: false,
                    scheduleModal: false,
                    errorMsg: msg,
                    invalidAlert: true,
                    alertType: "error"
                });
            } else {
                setState({
                    ...state,
                    errorMsg: msg,
                    invalidAlert: true,
                    alertType: "error"
                });
            }

        }

    };

    ///Grid stuff
    const [gridApi, setGridApi] = useState(null);
    // const [gridColumnApi, setGridColumnApi] = useState(null);


    function onGridReady(params) {
        setGridApi(params.api);
        // setGridColumnApi(params.columnApi);
    }



    const handleChange = (event) => {
        gridApi.setFilterModel({
            name: {
                filterType: "string",
                type: 'startsWith',
                filter: event.target.value
            }
        });
        // var filterState = gridApi.getFilterModel();
        // console.log('filterState: ', filterState);
        // props.setRoom(event.target.value);
        gridApi.onFilterChanged();
    };

    const openSpectrumControl = (event) => {
        if(user.accountType !== "Viewer"){
            let selectedRows = gridApi.getSelectedRows()
            if (selectedRows !== undefined && selectedRows.length > 0) {
                setState({
                    ...state,
                    spectrumModal: true,
                    spectrum: [selectedRows[0].red, selectedRows[0].yellow, selectedRows[0].blue],
                    selectedZones: selectedRows
                })
            }
            else {
                // TODO nothing selected warning
                handleAlertOpen("Please select one or more zones to edit");
            }
        }else{
            handleAlertOpen("Error you do not have permission to edit values");
        }
            

    };

    const setSpectrum = async () => {
        // console.log(state.spectrum);
        // console.log(state.selectedZones);
        for (let i = 0; i < state.spectrum.length; i++) {
            if (typeof state.spectrum[i] !== "number") {
                throw new Error("invalid type spectrum")
            }
            if (state.spectrum[i] < 0) {
                throw new Error("invalid value spectrum must be positive")
            }
            if (state.spectrum[i] > 100) {
                throw new Error("invalid value spectrum must be below 100")
            }
        }

        try {
            let updatedZones = []
            for (let i = 0; i < state.selectedZones.length; i++) {
                let ZoneRef = db.collection("LightZones").doc(state.selectedZones[i].doc);
                let data = await db.runTransaction((transaction) => {
                    return transaction.get(ZoneRef).then((roomDocSnapshot) => {
                        if (!roomDocSnapshot.exists) {
                            throw new Error("Document does not exist")
                        }
                        let data = roomDocSnapshot.data();
                        //maybe check and see if the document needs to be updated
                        if (data.red === state.spectrum[0] && data.yellow === state.spectrum[1] && data.blue === state.spectrum[2]) {
                            return {
                                ...data,
                                doc: roomDocSnapshot.id
                            };
                        }
                        let output = {
                            ...data,
                            red: state.spectrum[0],
                            yellow: state.spectrum[1],
                            blue: state.spectrum[2]
                        }
                        transaction.update(ZoneRef, output);
                        return {
                            ...output,
                            doc: roomDocSnapshot.id
                        };

                    });
                });
                updatedZones.push(data)
            }

            let newReduxLightZones = [];
            for (let i = 0; i < lightZones.length; i++) {
                let newArrayitem = {};
                for (let index = 0; index < updatedZones.length; index++) {
                    if (lightZones[i].name === updatedZones[index].name) {
                        newArrayitem = updatedZones[index]
                    }
                }
                if (newArrayitem === {} || newArrayitem.name === undefined) {
                    newArrayitem = lightZones[i]
                }
                newReduxLightZones.push(newArrayitem);
            }
            // console.log(newReduxLightZones)

            props.updateZones(newReduxLightZones)
            handleAlertOpen("Zones updated", "success", true)

        } catch (err) {
            console.log(err)
            handleAlertOpen("Error updating Zones")
        }



    }


    const openPowerControl = (event) => {
        if(user.accountType !== "Viewer"){
            let selectedRows = gridApi.getSelectedRows()
            // console.log(selectedRows)
            if (selectedRows !== undefined && selectedRows.length > 0) {
                setState({
                    ...state,
                    powerModal: true,
                    selectedZones: selectedRows
                })
            }
            else {
                handleAlertOpen("Please select one or more zones to edit");
            } 
        }else{
            handleAlertOpen("Error you do not have permission to edit values");
        }
        

    };

    const setPower = async () => {

        if (typeof state.power !== "number") {
            throw new Error("invalid type spectrum")
        }
        if (state.power < 0) {
            throw new Error("invalid value spectrum must be positive")
        }
        if (state.power > 100) {
            throw new Error("invalid value spectrum must be below 100")
        }
        try {
            let updatedZones = []
            for (let i = 0; i < state.selectedZones.length; i++) {
                if (!state.selectedZones[i].doc) {
                    throw new Error(`Error selected zone is missing doc ${state.selectedZones[i]}`)
                }
                let ZoneRef = db.collection("LightZones").doc(state.selectedZones[i].doc);

                let data = await db.runTransaction((transaction) => {
                    return transaction.get(ZoneRef).then((roomDocSnapshot) => {
                        if (!roomDocSnapshot.exists) {
                            throw new Error("Document does not exist")
                        }
                        let data = roomDocSnapshot.data();
                        //maybe check and see if the document needs to be updated
                        if (data.intensity === state.power) {
                            return {
                                ...data,
                                doc: roomDocSnapshot.id
                            };
                        }
                        let output = {
                            ...data,
                            intensity: state.power
                        }
                        transaction.update(ZoneRef, output);
                        return {
                            ...output,
                            doc: roomDocSnapshot.id
                        };

                    });
                });
                updatedZones.push(data)
            }

            let newReduxLightZones = [];
            for (let i = 0; i < lightZones.length; i++) {
                let newArrayitem = {};
                for (let index = 0; index < updatedZones.length; index++) {
                    if (lightZones[i].name === updatedZones[index].name) {
                        newArrayitem = updatedZones[index]
                    }
                }
                if (newArrayitem === {} || newArrayitem.name === undefined) {
                    newArrayitem = lightZones[i]
                }
                newReduxLightZones.push(newArrayitem);
            }
            // console.log(newReduxLightZones)

            props.updateZones(newReduxLightZones)

            handleAlertOpen("Zones updated", "success", true)

        } catch (err) {
            console.log(err)
            handleAlertOpen("Error updating Zones")
        }

    }

    const openScheduleControl = (event) => {
        if(user.accountType !== "Viewer"){
            let selectedRows = gridApi.getSelectedRows()
        // console.log(selectedRows)
        if (selectedRows !== undefined && selectedRows.length > 0) {      
            setState({
                ...state,
                scheduleModal: true,
                selectedZones: selectedRows,
                timeOn: createTimeStr(selectedRows[0].timeOn),
                timeOff:createTimeStr(selectedRows[0].timeOff),
                totalUptimePerDay:calcTotalUptime(selectedRows[0].timeOn, selectedRows[0].timeOff)
            })
        }
        else {
            // TODO nothing selected warning
            handleAlertOpen("Please select one or more zones to edit");
            // console.log("provide warning that nothing is selected");
        }
        }else{
            handleAlertOpen("Error you do not have permission to edit values");
        }
        

    };

    const handleStartTimeChange = (event) => {
        setState({
            ...state,
            timeOn: event.target.value,
            totalUptimePerDay:calcTotalUptime(event.target.value, state.timeOff)
        })
    }

    const handleEndTimeChange = (event) => {
        setState({
            ...state,
            timeOff: event.target.value,
            totalUptimePerDay:calcTotalUptime(state.timeOn, event.target.value)
        })
    }

    const setSchedule = async ()  => {
        try {
            let updatedZones = []
            for (let i = 0; i < state.selectedZones.length; i++) {
                if (!state.selectedZones[i].doc) {
                    throw new Error(`Error selected zone is missing doc ${state.selectedZones[i]}`)
                }
                let ZoneRef = db.collection("LightZones").doc(state.selectedZones[i].doc);

                let data = await db.runTransaction((transaction) => {
                    return transaction.get(ZoneRef).then((roomDocSnapshot) => {
                        if (!roomDocSnapshot.exists) {
                            throw new Error("Document does not exist")
                        }
                        let data = roomDocSnapshot.data();
                        //maybe check and see if the document needs to be updated
                        if (data.timeOn === state.timeOn && data.timeOff === state.timeOff) {
                            return {
                                ...data,
                                doc: roomDocSnapshot.id
                            };
                        }
                        let output = {
                            ...data,
                            timeOn: state.timeOn,
                            timeOff: state.timeOff
                        }
                        transaction.update(ZoneRef, output);
                        return {
                            ...output,
                            doc: roomDocSnapshot.id
                        };

                    });
                });
                updatedZones.push(data)
            }

            let newReduxLightZones = [];
            for (let i = 0; i < lightZones.length; i++) {
                let newArrayitem = {};
                for (let index = 0; index < updatedZones.length; index++) {
                    if (lightZones[i].name === updatedZones[index].name) {
                        newArrayitem = updatedZones[index]
                    }
                }
                if (newArrayitem === {} || newArrayitem.name === undefined) {
                    newArrayitem = lightZones[i]
                }
                newReduxLightZones.push(newArrayitem);
            }
            // console.log(newReduxLightZones)

            props.updateZones(newReduxLightZones)

            handleAlertOpen("Zones updated", "success", true)

        } catch (err) {
            console.log(err)
            handleAlertOpen("Error updating Zones")
        }
    }
    const handleClose = () => {
        setState({
            ...state,
            spectrumModal: false,
            powerModal: false,
            scheduleModal: false,
        })
    }

    const numberOfActiveZones = () => {
        let count = 0;
        if (lightZones.length > 0) {
            lightZones.forEach((item) => {
                if (item.active) {
                    count++
                }
            })
            return count;
        }
        else { return 0 }

    }

    return (
        <Grid item container direction={"column"} >
            {/* This is the topBar */}
            <Grid item container direction={"row"} spacing={1} style={{ paddingTop: "12px" }}>
                <Grid item xs={12} sm={12} md={3} style={{ marginLeft: "24px" }}>
                    <Typography variant={"h5"} className={classes.lightZoneHeader}>{`(${numberOfActiveZones()}) Light Zones Active`}</Typography>
                </Grid>
                <Grid item xs={false} sm md></Grid>
                <Grid item xs={2} sm={2} md={1}>
                    <IconButton onClick={openSpectrumControl}><WavesIcon color={"primary"} /></IconButton></Grid>
                <Grid item xs={2} sm={2} md={1}>
                    <IconButton onClick={openPowerControl}><WbIncandescentIcon color={"primary"} /></IconButton></Grid>
                <Grid item xs={2} sm={2} md={1}>
                    <IconButton onClick={openScheduleControl}><ScheduleIcon color={"primary"} /></IconButton></Grid>
                <Grid item xs={12} sm={5} md={2}>
                    <ZoneSearchInput id="filled-search" label="Search field" type="search" variant="filled" onChange={handleChange} />
                </Grid>
            </Grid>
            {/*this is the main AG grid bar with light zone information  */}
            <Grid item container direction={'row'} className={classes.agGridContainer}>
                <div className={`${classes.agGrid} ag-theme-alpine-dark`}>
                    <AgGridReact
                        rowData={lightZones}
                        rowSelection="multiple"
                        rowMultiSelectWithClick={true}
                        animateRows={true}
                        defaultColDef={{
                            flex: 1,
                            minWidth: 150,
                            sortable: true,
                            filter: true,
                        }}
                        onGridReady={onGridReady}
                        frameworkComponents={{
                            activeRenderer: activeIndicator,
                        }}
                    >

                        <AgGridColumn field="name" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                        <AgGridColumn field="active" sortable={true} cellRenderer={"activeRenderer"}></AgGridColumn>
                        <AgGridColumn field="timeOn" sortable={true}></AgGridColumn>
                        <AgGridColumn field="timeOff" sortable={true}></AgGridColumn>
                        <AgGridColumn field="intensity" sortable={true}></AgGridColumn>
                        <AgGridColumn field="red" sortable={true}></AgGridColumn>
                        <AgGridColumn field="yellow" sortable={true}></AgGridColumn>
                        <AgGridColumn field="blue" sortable={true}></AgGridColumn>
                    </AgGridReact>
                </div>
            </Grid>
            {/* spectrum modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={state.spectrumModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={state.spectrumModal}>
                    <Box className={classes.paper}>
                        <Grid item container direction={"column"} className={classes.setPointWidget}>
                            <Grid item container direction={"row"}>
                                <Grid item> <Typography variant={"h5"}>Light Spectrum Control</Typography></Grid>
                                <Grid item xs> </Grid>
                                <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                            </Grid>
                            <Grid item container direction={'row'}>
                                <div className="ag-theme-balham-dark" style={{ width: "90%", height: "128px", marginLeft: "24px" }}>
                                    <AgGridReact
                                        rowData={state.selectedZones}
                                        defaultColDef={{
                                            flex: 1,
                                            minWidth: 48,
                                        }}>
                                        <AgGridColumn field="name"></AgGridColumn>
                                        <AgGridColumn field="red" ></AgGridColumn>
                                        <AgGridColumn field="yellow" ></AgGridColumn>
                                        <AgGridColumn field="blue" ></AgGridColumn>
                                    </AgGridReact>
                                </div>
                            </Grid>
                            <Grid item container direction={"row"}>
                                <RGBInensities state={state} setState={setState} RGBSliders={classes.RGBSliders}/>
                            </Grid>
                            <Grid item container direction={"row"}>
                                <Button variant={"outlined"} color={"primary"} onClick={setSpectrum}>
                                    Set
                                    </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
            {/* power  */}
            <Modal
                aria-labelledby="transition-modal-Power"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={state.powerModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={state.powerModal}>
                    <Box className={classes.paper}>
                        <Grid item container direction={"column"} className={classes.setPointWidget}>
                            <Grid item container direction={"row"}>
                                <Grid item> <Typography variant={"h5"}>Light Intensity Control</Typography></Grid>
                                <Grid item xs> </Grid>
                                <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                            </Grid>
                            {/* <Grid item container direction={'row'}>
                                
                            </Grid> */}
                            <Grid item container direction={"row"}>
                                <Box style={{ marginLeft: "48px", marginBottom: "24px" }}>
                                    <PowerIntensity value={state.power} setFunc={(number) => {
                                        setState({
                                            ...state,
                                            power: number
                                        })
                                    }} />
                                </Box>
                                <div className="ag-theme-balham-dark" style={{ width: "50%", height: "128px", marginLeft: "48px", marginTop: "28px",paddingBottom:"12px" }}>
                                    <AgGridReact
                                        rowData={state.selectedZones}
                                        defaultColDef={{
                                            flex: 1,
                                            minWidth: 48,
                                        }}>
                                        <AgGridColumn field="name"></AgGridColumn>
                                        <AgGridColumn field="intensity" ></AgGridColumn>
                                    </AgGridReact>
                                </div>
                            </Grid>
                            <Grid item container direction={"row"}>
                                <Button variant={"outlined"} color={"primary"} onClick={setPower}>
                                    Set
                                    </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
            {/* Time Scheduler */}
            <Modal
                aria-labelledby="transition-modal-scheduler"
                aria-describedby="transition-modal-scheduler"
                className={classes.modal}
                open={state.scheduleModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={state.scheduleModal}>
                    <Box className={classes.paper}>
                        <Grid item container direction={"column"} className={classes.setPointWidget}>
                            <Grid item container direction={"row"}>
                                <Grid item> <Typography variant={"h5"}>Light Schedule Control</Typography></Grid>
                                <Grid item xs> </Grid>
                                <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                            </Grid>
                            <Grid item container direction={'row'}>
                                <div className="ag-theme-balham-dark" style={{ width: "90%", height: "128px", marginLeft: "24px" }}>
                                    <AgGridReact
                                        rowData={state.selectedZones}
                                        defaultColDef={{
                                            flex: 1,
                                            minWidth: 48,
                                        }}>
                                        <AgGridColumn field="name"></AgGridColumn>
                                        <AgGridColumn field="timeOn" ></AgGridColumn>
                                        <AgGridColumn field="timeOff" ></AgGridColumn>
                                        <AgGridColumn field="totalRuntime" ></AgGridColumn>
                                    </AgGridReact>
                                </div>
                            </Grid>
                            {/* <Grid item container direction={"row"}> */}
                                <Grid item container direction={"row"} className={classes.sliderRow}>
                                    <Grid item> <h6>Schedule lighting times</h6></Grid>
                                    
                                    <Grid item container direction={"row"}>
                                        <Typography variant={'body1'}>
                                            Lights on for {state.totalUptimePerDay} 
                                        </Typography>
                                    </Grid>
                                    <Grid item container direction={"row"} style={{ padding: "6px", marginBottom: "24px" }} spacing={1}>
                                        <TextField
                                            id="Start-time"
                                            label="Start Time"
                                            type="time"
                                            value={state.timeOn}
                                            onChange={handleStartTimeChange}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                        />

                                        <TextField
                                            id="End-time"
                                            label="End Time"
                                            type="time"
                                            value={state.timeOff}
                                            onChange={handleEndTimeChange}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300, // 5 min
                                            }}
                                        />

                                    </Grid>

                                </Grid>
                            
                            <Grid item container direction={"row"}>
                                <Button variant={"outlined"} color={"primary"} onClick={setSchedule}>
                                    Set
                                    </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
            {/* Snackbar Alert System */}
            <Snackbar open={state.invalidAlert} autoHideDuration={6000} onClose={handleInvalidAlertClose}>
                <Alert onClose={handleInvalidAlertClose} severity={state.alertType}>
                    {state.errorMsg}
                </Alert>
            </Snackbar>

        </Grid >
    )
}


function mapStateToProps({ state }) {
    return { state };
}

const formedComponent = compose(
    connect(mapStateToProps, { fetchZones: fetchZones, pendingZones: pendingZones, resetPendingZones: resetPendingZones, setExampleZones: setExampleZones, updateZones: updateZones })
)(LightingController);

export default formedComponent;
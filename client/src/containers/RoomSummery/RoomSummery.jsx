import React from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'; //useTheme
import { Grid, Typography, Select, FormControl, InputLabel, MenuItem, ListItemText, List, ListItem, ListItemIcon, Button, IconButton } from '@material-ui/core'
import ReactSpeedometer from "react-d3-speedometer"
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';





const ExampleRoomData = [
    {
        name: "Room Alpha",
        tempSetPoint: 72,
        humiditySetPoint: 44,
        CO2SetPoint: 3000,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime:864000,
        VegTime:3024000,
        FlowerTime:2419200,
    },
    {
        name: "Room beta",
        tempSetPoint: 72,
        humiditySetPoint: 44,
        CO2SetPoint: 3000,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime:864000,
        VegTime:3024000,
        FlowerTime:2419200,
    }, {
        name: "clone Room",
        tempSetPoint: 72,
        humiditySetPoint: 44,
        CO2SetPoint: 3000,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime:864000,
        VegTime:3024000,
        FlowerTime:2419200,
    }, {
        name: "flower one",
        tempSetPoint: 83,
        humiditySetPoint: 70,
        CO2SetPoint: 3000,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime:864000,
        VegTime:3024000,
        FlowerTime:2419200,
    }, {
        name: "flower two",
        tempSetPoint: 44,
        humiditySetPoint: 44,
        CO2SetPoint: 3000,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime:864000,
        VegTime:3024000,
        FlowerTime:2419200,
    }, {
        name: "veg room a",
        tempSetPoint: 21,
        humiditySetPoint: 44,
        CO2SetPoint: 1118,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        CloneTime:864000,
        VegTime:3024000,
        FlowerTime:2419200,
    }]










function DiagnosticColorBar(props) {
    const theme = useTheme();
    let color = theme.palette.primary.main;
    let top = props.top || "60%";
    let left = props.left || "10%";
    let msg = "nominal";
    let iconMsg = <CheckCircleIcon style={{ color: color }} />;
    // console.log(` supermin ${props.superMax} < value: ${props.datapoint} < max ${props.max}`);
    // console.log(` supermin ${props.superMin} > value: ${props.datapoint} < min ${props.min}`);
    if ((props.superMax > props.datapoint && props.datapoint > props.max) || (props.superMin < props.datapoint && props.datapoint < props.min)) {
        color = theme.palette.roomStatus.warning;
        msg = "Warning";
        iconMsg = <HelpIcon style={{ color: color }} />;
    }
    // console.log(props.datapoint > props.superMax);
    // console.log(props.datapoint < props.superMin)
    if (props.datapoint > props.superMax || props.datapoint < props.superMin) {
        color = theme.palette.roomStatus.fault;
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
                <Button variant="outlined" color={"primary"} style={{ marginLeft: "12px" }}>

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


function TempMeter(props) {
    const state = props.state;
    const classes = props.classes;
    const theme = props.theme;
    const tempUnitString = props.tempUnitString;
    return (
        <Grid container item xs direction={'column'} justify={'center'}>

            <Typography variant={"h6"} align={'center'}>Temp</Typography>
            <Grid item xs className={classes.meterContainer}>
                <ReactSpeedometer
                    forceRender
                    width={256}
                    needleTransitionDuration={2000}
                    needleTransition="easeElastic"
                    needleHeightRatio={0.7}
                    value={state.liveData.temp}
                    currentValueText={`${state.liveData.temp} °F`}
                    minValue={state.rooms[state.pick].tempSetPoint - 50}
                    maxValue={state.rooms[state.pick].tempSetPoint + 50}
                    segments={5}
                    customSegmentStops={[state.rooms[state.pick].tempSetPoint - 50,
                    state.rooms[state.pick].tempSetPoint - 20, state.rooms[state.pick].tempSetPoint - 5, state.rooms[state.pick].tempSetPoint + 5,
                    state.rooms[state.pick].tempSetPoint + 20, state.rooms[state.pick].tempSetPoint + 50]}
                    segmentColors={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main, theme.palette.roomStatus.warning,
                    theme.palette.roomStatus.fault]} />

                <DiagnosticColorBar datapoint={state.liveData.temp} min={state.rooms[state.pick].tempSetPoint - 5} superMin={state.rooms[state.pick].tempSetPoint - 20}
                    max={state.rooms[state.pick].tempSetPoint + 5} superMax={state.rooms[state.pick].tempSetPoint + 20} setPoint={`${state.rooms[state.pick].tempSetPoint}${tempUnitString}`} />
            </Grid>
        </Grid>
    );
};

function HumidityMeter(props) {
    const state = props.state;
    const classes = props.classes;
    const theme = props.theme;
    return (
        <Grid container item xs direction={'column'} justify={'center'}>
            <Typography variant={"h6"} align={'center'}>Humidty</Typography>
            <Grid item xs className={classes.meterContainer}>
                <ReactSpeedometer
                    forceRender
                    width={256}
                    needleHeightRatio={0.7}
                    needleTransitionDuration={2000}
                    needleTransition="easeElastic"
                    value={state.liveData.humidty}
                    currentValueText={`${state.liveData.humidty} %`}
                    minValue={state.rooms[state.pick].humiditySetPoint - 50}
                    maxValue={state.rooms[state.pick].humiditySetPoint + 50}
                    segments={5}
                    customSegmentStops={[state.rooms[state.pick].humiditySetPoint - 50,
                    state.rooms[state.pick].humiditySetPoint - 30,
                    state.rooms[state.pick].humiditySetPoint - 10,
                    state.rooms[state.pick].humiditySetPoint + 10, state.rooms[state.pick].humiditySetPoint + 30,
                    state.rooms[state.pick].humiditySetPoint + 50]}
                    segmentColors={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main, theme.palette.roomStatus.warning, theme.palette.roomStatus.fault]} />
                <DiagnosticColorBar datapoint={state.liveData.humidty} min={state.rooms[state.pick].humiditySetPoint - 10} superMin={state.rooms[state.pick].humiditySetPoint - 30}
                    max={state.rooms[state.pick].humiditySetPoint + 10} superMax={state.rooms[state.pick].humiditySetPoint + 30} setPoint={state.rooms[state.pick].humiditySetPoint + " %"} />
            </Grid>

        </Grid>
    );
};


function CO2LevelMeter(props) {
    const state = props.state;
    const classes = props.classes;
    const theme = props.theme;
    return (
        <Grid container item xs direction={'column'} justify={'center'}>
                    <Typography variant={"h6"} align={'center'}>CO2 Level</Typography>
                    <Grid item xs className={classes.meterContainer}>
                        <ReactSpeedometer
                            width={256}
                            forceRender
                            needleTransitionDuration={2000}
                            needleTransition="easeElastic"
                            needleHeightRatio={0.7}
                            value={state.liveData.CO2level}
                            currentValueText={`${state.liveData.CO2level} ppm`}
                            minValue={state.rooms[state.pick].CO2SetPoint - 2000}
                            maxValue={state.rooms[state.pick].CO2SetPoint + 2000}
                            segments={5}
                            customSegmentStops={[state.rooms[state.pick].CO2SetPoint - 2000, state.rooms[state.pick].CO2SetPoint - 1000, state.rooms[state.pick].CO2SetPoint - 200, state.rooms[state.pick].CO2SetPoint + 200, state.rooms[state.pick].CO2SetPoint + 1000, state.rooms[state.pick].CO2SetPoint + 2000]}
                            segmentColors={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main, theme.palette.roomStatus.warning, theme.palette.roomStatus.fault]} />

                        <DiagnosticColorBar datapoint={state.liveData.CO2level} min={state.rooms[state.pick].CO2SetPoint - 200} superMin={state.rooms[state.pick].CO2SetPoint - 1000}
                            max={state.rooms[state.pick].CO2SetPoint + 200} superMax={state.rooms[state.pick].CO2SetPoint + 1000} setPoint={state.rooms[state.pick].CO2SetPoint + " ppm"} />
                    </Grid>
                </Grid>
    );
};


function PressureMeter(props) {
    const state = props.state;
    const classes = props.classes;
    const theme = props.theme;
    return (
        <Grid container item xs direction={'column'} justify={'center'}>
                    <Typography variant={"h6"} align={'center'}>Pressure level</Typography>
                    <Grid item xs className={classes.meterContainer}>
                        <ReactSpeedometer
                            forceRender
                            width={256}
                            needleTransitionDuration={2000}
                            needleTransition="easeElastic"
                            needleHeightRatio={0.7}
                            value={state.liveData.pressure}
                            minValue={state.rooms[state.pick].pressureSetPont - 300}
                            maxValue={state.rooms[state.pick].pressureSetPont + 300}
                            segments={5}
                            currentValueText={`${state.liveData.pressure} mbar`}
                            customSegmentStops={[state.rooms[state.pick].pressureSetPont - 300, state.rooms[state.pick].pressureSetPont - 100, state.rooms[state.pick].pressureSetPont - 20, state.rooms[state.pick].pressureSetPont + 20, state.rooms[state.pick].pressureSetPont + 100, state.rooms[state.pick].pressureSetPont + 300]}
                            segmentColors={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main, theme.palette.roomStatus.warning, theme.palette.roomStatus.fault]} />
                        <DiagnosticColorBar datapoint={state.liveData.pressure} min={state.rooms[state.pick].pressureSetPont - 20} superMin={state.rooms[state.pick].pressureSetPont - 100}
                            max={state.rooms[state.pick].pressureSetPont + 20} superMax={state.rooms[state.pick].pressureSetPont + 100} setPoint={state.rooms[state.pick].pressureSetPont + " mbar"} />
                    </Grid>
                </Grid>
    );
};


function StageMeter(props) {
    const state = props.state;
    const classes = props.classes;
    const theme = props.theme;
    const cloneHours = (state.rooms[state.pick].CloneTime/60)/60;
    const vegHours = (state.rooms[state.pick].VegTime/60)/60;
    const flowerHours = (state.rooms[state.pick].FlowerTime/60)/60;
    const TotalDays = (cloneHours)/24+(vegHours)/24+(flowerHours)/24
    // console.log(` ${cloneHours} ${vegHours} ${flowerHours} ${TotalDays}`)
    return (
        <Grid container item xs direction={'column'} justify={'center'}>
                    <Typography variant={"h6"} align={'center'}>Life Stage</Typography>
                    <Grid item xs className={classes.meterContainer}>
                        <ReactSpeedometer
                            forceRender
                            width={256}
                            needleTransitionDuration={2000}
                            needleTransition="easeElastic"
                            needleHeightRatio={0.7}
                            value={26}
                            minValue={0}
                            maxValue={TotalDays}//state.rooms[state.pick].CloneTime +state.rooms[state.pick].VegTime+state.rooms[state.pick].FlowerTime
                            segments={5}
                            currentValueText={`${32} days`}
                            customSegmentStops={[0, (cloneHours)/24, (vegHours)/24 , TotalDays]}
                            segmentColors={[theme.palette.roomStatus.clone, theme.palette.roomStatus.veg, theme.palette.roomStatus.flower]} />
                        <DiagnosticColorBar datapoint={2} min={1} superMin={0}
                            max={3} superMax={4} setPoint={state.rooms[state.pick].stage + " left in"} />
                    </Grid>
                </Grid>
    );
};

const LeftRightButton = withStyles({
    root: {
        width:"48px",
        height:"128px",
      boxShadow: 'none',
      textTransform: 'none',
      marginLeft:"24px",
      marginRight:"24px",
      fontSize: 64,
      lineHeight: 1.5,

      },
  })(Button);

  const useStyles = makeStyles((theme) => ({
    roomSummeryWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "256px",
        minHeight: "360px",
    },
    iconButton: {
        color: "white",
    },
    meterContainer: {
        // background:theme.palette.roomStatus.warning,
        minWidth: "128px",
        maxWidth: "256px",
        maxHeight: "256px",
        position: "relative",
    },

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
    
    const [state, setState] = React.useState({ //setState
        liveData: {
            temp: 74,
            humidty: 82,
            CO2level: 2988,
            pressure: 1114
        },
        rooms: ExampleRoomData,
        pick: 0,
        MeterArrayIndexStart:0
    });

    let MeterArray = [ 
        <TempMeter state={state} theme={theme} classes={classes} tempUnitString={tempUnitString} key={0}/>,
        <HumidityMeter state={state} theme={theme} classes={classes} key={10}/>,
        <CO2LevelMeter state={state} theme={theme} classes={classes}  key={20}/>,
        <StageMeter state={state} theme={theme} classes={classes} key={40}/>,
        <PressureMeter state={state} theme={theme} classes={classes} key={30}/> ];

    const handleChange = (event) => {
        console.log(state.pick)
        const name = event.target.name;
        // console.log(name);
        setState({
            ...state,
            [name]: event.target.value,
        });
        // props.setRoom(event.target.value);
    };

    const handleRightShift = () => {
        if(state.MeterArrayIndexStart===1){
            setState({
                ...state,
                MeterArrayIndexStart:0
            });
        }else{
            setState({
                ...state,
                MeterArrayIndexStart:1
            });
        }
    }


    return (
        <Grid item container direction={"column"} className={classes.roomSummeryWidget} spacing={3}>
            <Grid container item direction="row" xs>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant={"h4"}>Room</Typography>
                </Grid>
                <Grid item xs ></Grid>
                <Grid item xs={2}>
                    <FormControl variant={"filled"} className={classes.formControl} color={'primary'} focused >
                        <InputLabel htmlFor="Room-Name">Room</InputLabel>
                        <Select
                            value={state.pick}
                            onChange={handleChange}
                            inputProps={{
                                name: 'pick',
                                id: 'Room-Name',
                            }}
                            defaultValue={0}
                        >
                            {state.rooms.map((Item, Index) => (
                                <MenuItem key={Index} value={Index}>{Item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item container direction={'row'}>
                <Grid item container direction={'column'} justify={"center"} lg={1}>
                    <LeftRightButton color={"primary"} onClick={handleRightShift}><KeyboardArrowLeftIcon style={{ fontSize: 48 }}/></LeftRightButton>
                </Grid>
                <Grid item container direction={'row'} lg>
                    {MeterArray.map((Component, index) => {
                        if(state.MeterArrayIndexStart === 1){
                            if(index>0){
                                return(
                                    Component 
                                );
                            }
                            return(<div key={index}></div>);
                        }else{
                            if(index<MeterArray.length-1){
                                return(
                                    Component 
                                );
                            }
                            return(<div key={index}></div>);
                        }
                    })}
                </Grid>
                <Grid item container direction={'column'} justify={"center"} lg={1}>
                    <LeftRightButton color={"primary"} onClick={handleRightShift}><KeyboardArrowRightIcon style={{ fontSize: 48 }}/></LeftRightButton>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default RoomSummery

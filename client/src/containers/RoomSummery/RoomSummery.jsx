import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'; //useTheme
import { Grid, Typography, Select, FormControl, InputLabel, MenuItem, ListItemText, List, ListItem, ListItemIcon, Button } from '@material-ui/core'
import ReactSpeedometer from "react-d3-speedometer"
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';

const ExampleRoomData = [
    {
        name: "Room Alpha",
        tempSetPoint: 72,
        humiditySetPoint: 44,
        CO2SetPoint: 3000,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        dateStageCompletion: 1600560000,
    },
    {
        name: "Room beta",
        tempSetPoint: 72,
        humiditySetPoint: 44,
        CO2SetPoint: 3000,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        dateStageCompletion: 1600560000,
    }, {
        name: "clone Room",
        tempSetPoint: 72,
        humiditySetPoint: 44,
        CO2SetPoint: 3000,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        dateStageCompletion: 1600560000,
    }, {
        name: "flower one",
        tempSetPoint: 83,
        humiditySetPoint: 70,
        CO2SetPoint: 3000,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        dateStageCompletion: 1600560000,
    }, {
        name: "flower two",
        tempSetPoint: 44,
        humiditySetPoint: 44,
        CO2SetPoint: 3000,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        dateStageCompletion: 1600560000,
    }, {
        name: "veg room a",
        tempSetPoint: 21,
        humiditySetPoint: 44,
        CO2SetPoint: 1118,
        pressureSetPont: 1114,
        stage: "veg",
        dateStarted: 1597017600,
        dateStageCompletion: 1600560000,
    }]

const useStyles = makeStyles((theme) => ({
    roomSummeryWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "256px",
        minHeight: "360px",
        marginTop: "8px",
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








function DiagnosticColorBar(props) {
    const theme = useTheme();
    let color = theme.palette.primary.main;
    let top = props.top || "60%";
    let left = props.left || "10%";
    let msg = "nominal";
    let iconMsg = <CheckCircleIcon style={{ color: color }} />;
    console.log(` supermin ${props.superMax} < value: ${props.datapoint} < max ${props.max}`);
    console.log(` supermin ${props.superMin} > value: ${props.datapoint} < min ${props.min}`);
    if ((props.superMax > props.datapoint && props.datapoint > props.max) || (props.superMin < props.datapoint && props.datapoint < props.min)) {
        color = theme.palette.roomStatus.warning;
        msg = "Warning";
        iconMsg = <HelpIcon style={{ color: color }} />;
    }
    console.log(props.datapoint > props.superMax);
    console.log(props.datapoint < props.superMin)
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
                <Button variant="outlined" color={"primary"} style={{marginLeft:"12px"}}>

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
        pick: 0
    });

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

    return (
        <Grid item container direction={"column"} className={classes.roomSummeryWidget} spacing={3}>
            <Grid container item direction="row" xs>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant={"h6"}>Room</Typography>
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
            </Grid>
        </Grid>
    )
}

export default RoomSummery

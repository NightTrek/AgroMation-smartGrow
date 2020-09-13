import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import moment from "moment";
import { connect, useSelector, shallowEqual } from 'react-redux';
import { compose } from "redux";
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'; //useTheme
import { Grid, Typography, Select, MenuItem, ListItemText, List, ListItem, ListItemIcon, Button, Modal, Backdrop, Fade, Box, Slider, Input, IconButton } from '@material-ui/core'
import ReactSpeedometer from "react-d3-speedometer"
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { StandardRoundSelectForm } from "../../components/StandardSelect/StandardSelect.js";
import { ExampleRoomData } from "../../exampleDataTypes/clientExamlpeDataTypes";
import CancelIcon from '@material-ui/icons/Cancel';
// import VerticleDividerStyled from "../../components/VerticalDivider/VerticalDivider";

//Redux actions
import { getRooms, setRoom } from "../../actions";


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


function TempMeter(props) {
    const roomState = props.state;
    const classes = props.classes;
    const theme = props.theme;
    const tempUnitString = props.tempUnitString;

    //setPointStuff
    const [meterState, setMeterState] = React.useState({
        setPoint:roomState.rooms[roomState.pick].tempSetPoint,
        max:roomState.rooms[roomState.pick].tempMax,
        min:roomState.rooms[roomState.pick].tempMin,
    });
    //slider handlers
    const handleSetPointSliderChange = (event, newValue) => {
        setMeterState({...meterState, setPoint:newValue});
    };
    const handleMaxSliderChange = (event, newValue) => {
        setMeterState({...meterState, max:newValue});
    };
    const handleMinSliderChange = (event, newValue) => {
        setMeterState({...meterState, min:newValue});
    };
    //input handlers
    const handleSetPointInputChange = (event) => {
        setMeterState({...meterState, setPoint:event.target.value === '' ? '' : Number(event.target.value)});
    };
    const handleMaxInputChange = (event) => {
        setMeterState({...meterState, max:event.target.value === '' ? '' : Number(event.target.value)});
    };
    const handleMinInputChange = (event) => {
        setMeterState({...meterState, min:event.target.value === '' ? '' : Number(event.target.value)});
    };
    const handleBlur = (event) => {
        if (meterState.setPoint < 0) {
            setMeterState({...meterState, setPoint:0});
        } else if (meterState.setPoint > 100) {
            setMeterState({...meterState, setPoint:100});
        }
    };
    console.log(meterState);
    

    //modal stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (roomState.rooms[roomState.pick].tempSetPoint === meterState.setPoint) {
            setOpen(false);
        }
        else {
            alert("ALERT changes have not been sent too the device");
            setOpen(false);
        }
    };

    //Label stuff
    const [Labels, setLabels] = React.useState([{}, {}, {}, {}, {}]);


    const handleMouseEnter = () => {
        console.log("mouse Enter CO2")
        setLabels([{
            text: `${roomState.rooms[roomState.pick].tempSetPoint - 20}${tempUnitString}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        }, {
            text: `${roomState.rooms[roomState.pick].tempSetPoint - 5}${tempUnitString}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: ``,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: `${roomState.rooms[roomState.pick].tempSetPoint + 5}${tempUnitString}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: `${roomState.rooms[roomState.pick].tempSetPoint + 20}${tempUnitString}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        }])
    }
    const handleMouseLeave = () => {
        setLabels([{}, {}, {}, {}, {}])
    }

    return (
        <Grid container item sm={12} md={6} lg={3} direction={'column'} justify={'center'}>

            <Typography variant={"h6"} align={'center'}>Temp</Typography>
            <Grid item xs className={classes.meterContainer}>
                <div className={"speedometer1"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <ReactSpeedometer
                        forceRender
                        width={256}
                        needleTransitionDuration={2000}
                        needleTransition="easeElastic"
                        needleHeightRatio={0.7}
                        needleColor={theme.palette.text.main}
                        value={roomState.liveData.temp}
                        currentValueText={`${roomState.liveData.temp} °F`}
                        minValue={roomState.rooms[roomState.pick].tempSetPoint - 50}
                        maxValue={roomState.rooms[roomState.pick].tempSetPoint + 50}
                        segments={5}
                        customSegmentStops={[roomState.rooms[roomState.pick].tempSetPoint - 50,
                        roomState.rooms[roomState.pick].tempSetPoint - 20, roomState.rooms[roomState.pick].tempSetPoint - 5, roomState.rooms[roomState.pick].tempSetPoint + 5,
                        roomState.rooms[roomState.pick].tempSetPoint + 20, roomState.rooms[roomState.pick].tempSetPoint + 50]}
                        segmentColors={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main, theme.palette.roomStatus.warning,
                        theme.palette.roomStatus.fault]}
                        customSegmentLabels={Labels}
                    />
                </div>
                <DiagnosticColorBar handleOpen={handleOpen} datapoint={roomState.liveData.temp} min={roomState.rooms[roomState.pick].tempSetPoint - 5} superMin={roomState.rooms[roomState.pick].tempSetPoint - 20}
                    max={roomState.rooms[roomState.pick].tempSetPoint + 5} superMax={roomState.rooms[roomState.pick].tempSetPoint + 20} setPoint={`${roomState.rooms[roomState.pick].tempSetPoint}${tempUnitString}`} />
                <Modal
                    aria-labelledby="Temprature setpoint modal"
                    aria-describedby="Set the temprature of controller"
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
                                    <Grid item xs> <Grid item ><h3 id="transition-modal-title">Adjust Setpoint</h3></Grid></Grid>
                                    <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                                </Grid>

                                <Grid item container direction={"column"} className={classes.sliderRow}>
                                    <Grid item container direction={"row"} style={{ padding: "6px", marginBottom: "24px" }}>
                                        <Grid item> <h4>Temprature</h4></Grid>
                                        <Grid item xs> </Grid>
                                    </Grid>
                                    <Grid item container direction={'row'}>
                                        <Grid item xs>
                                            <Typography variant={"body1"}>Maximum</Typography>
                                            <Slider
                                                value={typeof meterState.max === 'number' ? meterState.max : 0}
                                                onChange={handleMaxSliderChange}
                                                aria-labelledby="maxPoint-slider"
                                                min={0}
                                                max={120}
                                                metertype={'max'}
                                                style={{width:"95%"}}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input
                                                className={classes.input}
                                                value={meterState.max}
                                                margin="dense"
                                                onChange={handleMaxInputChange}
                                                // onBlur={handleBlur}
                                                metertype={'max'}
                                                inputProps={{
                                                    step: 1,
                                                    min: 0,
                                                    max: 120,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item style={{position:"relative"}}>
                                            <Typography variant={"caption"} style={{ padding: "4px",position:"absolute", top:"24px" }}> {tempUnitString}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction={'row'}>
                                        <Grid item xs>
                                            <Typography variant={"body1"}>SetPoint</Typography>
                                            <Slider
                                                value={typeof meterState.setPoint === 'number' ? meterState.setPoint : 0}
                                                onChange={handleSetPointSliderChange}
                                                aria-labelledby="setPoint-slider"
                                                min={0}
                                                max={120}
                                                metertype={'setPoint'}
                                                style={{width:"95%"}}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input
                                                className={classes.input}
                                                value={meterState.setPoint}
                                                margin="dense"
                                                onChange={handleSetPointInputChange}
                                                onBlur={handleBlur}
                                                metertype={'setPoint'}
                                                inputProps={{
                                                    step: 1,
                                                    min: 0,
                                                    max: 120,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item style={{position:"relative"}}>
                                            <Typography variant={"caption"} style={{ padding: "4px",position:"absolute", top:"24px" }}> {tempUnitString}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction={'row'}>
                                        <Grid item xs>
                                            <Typography variant={"body1"}>Minimum</Typography>
                                            <Slider
                                                value={typeof meterState.min === 'number' ? meterState.min : 0}
                                                onChange={handleMinSliderChange}
                                                aria-labelledby="min-slider"
                                                min={0}
                                                max={120}
                                                metertype={'min'}
                                                style={{width:"95%"}}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input
                                                className={classes.input}
                                                value={meterState.min}
                                                margin="dense"
                                                onChange={handleMinInputChange}
                                                onBlur={handleBlur}
                                                metertype={'min'}
                                                inputProps={{
                                                    step: 1,
                                                    min: 0,
                                                    max: 120,
                                                    type: 'number',
                                                    'aria-labelledby': 'min-input-slider',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item style={{position:"relative"}}>
                                            <Typography variant={"caption"} style={{ padding: "4px",position:"absolute", top:"24px" }}> {tempUnitString}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item container direction={"row"}>
                                    <Button variant={"outlined"} color={"primary"}>
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

function HumidityMeter(props) {
    const state = props.state;
    const classes = props.classes;
    const theme = props.theme;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //setPointStuff
    const [setPoint, setValue] = React.useState(state.rooms[state.pick].humiditySetPoint);
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
        if (setPoint < 0) {
            setValue(0);
        } else if (setPoint > 100) {
            setValue(100);
        }
    };

    //Label stuff
    const [Labels, setLabels] = React.useState([{}, {}, {}, {}, {}]);


    const handleMouseEnter = () => {
        console.log("mouse Enter CO2")
        setLabels([{
            text: `${state.rooms[state.pick].humiditySetPoint - 20}%`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        }, {
            text: `${state.rooms[state.pick].humiditySetPoint - 5}%`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: ``,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: `${state.rooms[state.pick].humiditySetPoint + 5}%`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: `${state.rooms[state.pick].humiditySetPoint + 20}%`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        }])
    }
    const handleMouseLeave = () => {
        setLabels([{}, {}, {}, {}, {}])
    }


    return (
        <Grid container item sm={12} md={6} lg={3} direction={'column'} justify={'center'}>
            <Typography variant={"h6"} align={'center'}>Humidty</Typography>
            <Grid item xs className={classes.meterContainer}>
                <div className={"speedometer1"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                        segmentColors={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main, theme.palette.roomStatus.warning, theme.palette.roomStatus.fault]}
                        customSegmentLabels={Labels} />
                </div>
                <DiagnosticColorBar handleOpen={handleOpen} datapoint={state.liveData.humidty} min={state.rooms[state.pick].humiditySetPoint - 10} superMin={state.rooms[state.pick].humiditySetPoint - 30}
                    max={state.rooms[state.pick].humiditySetPoint + 10} superMax={state.rooms[state.pick].humiditySetPoint + 30} setPoint={state.rooms[state.pick].humiditySetPoint + " %"} />
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
                                    <Grid item xs> <Grid item ><h3 id="transition-modal-title">Adjust Setpoint</h3></Grid></Grid>
                                    <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                                </Grid>

                                <Grid item container direction={"column"} className={classes.sliderRow}>
                                    <Grid item container direction={"row"} style={{ padding: "6px", marginBottom: "24px" }}>
                                        <Grid item> <h4>Humidity</h4></Grid>
                                        <Grid item xs> </Grid>
                                    </Grid>
                                    <Grid item container direction={'row'}>
                                        <Grid item xs>
                                            <Slider
                                                value={typeof setPoint === 'number' ? setPoint : 0}
                                                onChange={handleSliderChange}
                                                aria-labelledby="setPoint-slider"
                                                min={0}
                                                max={100}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input
                                                className={classes.input}
                                                value={setPoint}
                                                margin="dense"
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                inputProps={{
                                                    step: 1,
                                                    min: 0,
                                                    max: 100,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant={"caption"} style={{ padding: "4px" }}> %</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item container direction={"row"}>
                                    <Button variant={"outlined"} color={"primary"}>
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


function CO2LevelMeter(props) {
    const state = props.state;
    const classes = props.classes;
    const theme = props.theme;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //setPointStuff
    const [setPoint, setValue] = React.useState(state.rooms[state.pick].CO2SetPoint);
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
        if (setPoint < 0) {
            setValue(0);
        } else if (setPoint > 100) {
            setValue(6000);
        }
    };

    //Label stuff
    const [Labels, setLabels] = React.useState([{}, {}, {}, {}, {}]);


    const handleMouseEnter = () => {
        console.log("mouse Enter CO2")
        setLabels([{
            text: `${state.rooms[state.pick].CO2SetPoint - 1000}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        }, {
            text: `${state.rooms[state.pick].CO2SetPoint - 200}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: ``,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: `${state.rooms[state.pick].CO2SetPoint + 200}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: `${state.rooms[state.pick].CO2SetPoint + 1000}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        }])
    }
    const handleMouseLeave = () => {
        setLabels([{}, {}, {}, {}, {}])
    }

    return (
        <Grid container item sm={12} md={6} lg={3} direction={'column'} justify={'center'}>
            <Typography variant={"h6"} align={'center'}>CO2 Level</Typography>
            <Grid item xs className={classes.meterContainer}>
                <div className={"speedometer1"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                        segmentColors={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main, theme.palette.roomStatus.warning, theme.palette.roomStatus.fault]}
                        customSegmentLabels={Labels} />
                </div>
                <DiagnosticColorBar handleOpen={handleOpen} datapoint={state.liveData.CO2level} min={state.rooms[state.pick].CO2SetPoint - 200} superMin={state.rooms[state.pick].CO2SetPoint - 1000}
                    max={state.rooms[state.pick].CO2SetPoint + 200} superMax={state.rooms[state.pick].CO2SetPoint + 1000} setPoint={state.rooms[state.pick].CO2SetPoint + " ppm"} />
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
                                    <Grid item xs> <Grid item ><h3 id="transition-modal-title">Adjust Setpoint</h3></Grid></Grid>
                                    <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                                </Grid>

                                <Grid item container direction={"column"} className={classes.sliderRow}>
                                    <Grid item container direction={"row"} style={{ padding: "6px", marginBottom: "24px" }}>
                                        <Grid item> <h4>CO2 Level</h4></Grid>
                                        <Grid item xs> </Grid>
                                    </Grid>
                                    <Grid item container direction={'row'}>
                                        <Grid item xs>
                                            <Slider
                                                value={typeof setPoint === 'number' ? setPoint : 0}
                                                onChange={handleSliderChange}
                                                aria-labelledby="setPoint-slider"
                                                min={0}
                                                max={6000}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input
                                                className={classes.input}
                                                value={setPoint}
                                                margin="dense"
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                inputProps={{
                                                    step: 1,
                                                    min: 0,
                                                    max: 6000,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant={"caption"} style={{ padding: "4px" }}> ppm</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item container direction={"row"}>
                                    <Button variant={"outlined"} color={"primary"}>
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


function PressureMeter(props) {
    const state = props.state;
    const classes = props.classes;
    const theme = props.theme;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    //setPointStuff
    const [setPoint, setValue] = React.useState(state.rooms[state.pick].pressureSetPont);
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
        if (setPoint < 500) {
            setValue(500);
        } else if (setPoint > 1500) {
            setValue(1500);
        }
    };

    //Label stuff
    const [Labels, setLabels] = React.useState([{}, {}, {}, {}, {}]);


    const handleMouseEnter = () => {
        setLabels([{
            text: `${state.rooms[state.pick].pressureSetPont - 300}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        }, {
            text: `${state.rooms[state.pick].pressureSetPont - 100}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: `${state.rooms[state.pick].pressureSetPont - 20}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: `${state.rooms[state.pick].pressureSetPont + 20}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: `${state.rooms[state.pick].pressureSetPont + 100}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        }])
    }
    const handleMouseLeave = () => {
        setLabels([{}, {}, {}, {}, {}])
    }

    return (
        <Grid container item sm={12} md={6} lg={3} direction={'column'} justify={'center'}>
            <Typography variant={"h6"} align={'center'}>Pressure level</Typography>
            <Grid item xs className={classes.meterContainer}>
                <div className={"speedometer1"} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                        segmentColors={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main, theme.palette.roomStatus.warning, theme.palette.roomStatus.fault]}
                        customSegmentLabels={Labels} />
                </div>
                <DiagnosticColorBar handleOpen={handleOpen} datapoint={state.liveData.pressure} min={state.rooms[state.pick].pressureSetPont - 20} superMin={state.rooms[state.pick].pressureSetPont - 100}
                    max={state.rooms[state.pick].pressureSetPont + 20} superMax={state.rooms[state.pick].pressureSetPont + 100} setPoint={state.rooms[state.pick].pressureSetPont + " mbar"} />
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
                                    <Grid item xs> <Grid item ><h3 id="transition-modal-title">Adjust Setpoint</h3></Grid></Grid>
                                    <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                                </Grid>

                                <Grid item container direction={"column"} className={classes.sliderRow}>
                                    <Grid item container direction={"row"} style={{ padding: "6px", marginBottom: "24px" }}>
                                        <Grid item> <h4>Pressure level</h4></Grid>
                                        <Grid item xs> </Grid>
                                    </Grid>
                                    <Grid item container direction={'row'}>
                                        <Grid item xs>
                                            <Slider
                                                value={typeof setPoint === 'number' ? setPoint : 0}
                                                onChange={handleSliderChange}
                                                aria-labelledby="setPoint-slider"
                                                min={0}
                                                max={1500}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input
                                                className={classes.input}
                                                value={setPoint}
                                                margin="dense"
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                inputProps={{
                                                    step: 1,
                                                    min: 0,
                                                    max: 1500,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant={"caption"} style={{ padding: "4px" }}> mbar</Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item container direction={"row"}>
                                    <Button variant={"outlined"} color={"primary"}>
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


function StageMeter(props) {
    const state = props.state;
    const classes = props.classes;

    const theme = props.theme;
    const cloneHours = (state.rooms[state.pick].CloneTime / 60) / 60;
    const vegHours = (state.rooms[state.pick].VegTime / 60) / 60;
    const flowerHours = (state.rooms[state.pick].FlowerTime / 60) / 60;
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
        <Grid container item sm={12} md={6} lg={3} direction={'column'} justify={'center'}>
            <Typography variant={"h6"} align={'center'}>Life Stage</Typography>
            <Grid item xs className={classes.meterContainer}>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <ReactSpeedometer
                        forceRender
                        width={256}
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
                <DiagnosticColorBar handleOpen={handleOpen} datapoint={2} min={1} superMin={0}
                    max={3} superMax={4} setPoint={state.rooms[state.pick].stage + " left in"} />
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
                                    <Typography variant={'h5'}>Adjusting Staging values is not Allowed at this time</Typography>
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

const LeftRightButton = withStyles({
    root: {
        width: "48px",
        height: "128px",
        boxShadow: 'none',
        textTransform: 'none',
        marginLeft: "24px",
        marginRight: "24px",
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
    ReactMeter: {
        // -webkit-filter: grayscale(100%);
        // -moz-filter: grayscale(100%);
        // -ms-filter: grayscale(100%);
        // -o-filter: grayscale(100%);
        filter: "grayscale(1)",
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
    },
    paper: {
        position: "absolute",
        minWidth: "512px",
        color: theme.palette.text.main,
        backgroundColor: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.secondary.dark}`,
        boxShadow: theme.shadows[5],
        padding: "12px",
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
        marginTop:"24px",
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

    const [state, setState] = React.useState({ //setState
        liveData: {
            temp: 74,
            humidty: 82,
            CO2level: 2988,
            pressure: 1114
        },
        rooms: ExampleRoomData,
        pick: 0,
        MeterArrayIndexStart: 0
    });

    let MeterArray = [
        <TempMeter state={state} theme={theme} classes={classes} tempUnitString={tempUnitString} key={0} />,
        <HumidityMeter state={state} theme={theme} classes={classes} key={10} />,
        <CO2LevelMeter state={state} theme={theme} classes={classes} key={20} />,
        <StageMeter state={state} theme={theme} classes={classes} key={40} />,
        <PressureMeter state={state} theme={theme} classes={classes} key={30} />];

        let { rooms, pick } = useSelector(state => ({
            rooms: state.growRooms.rooms,
            pick: state.growRooms.roomIndex

        }), shallowEqual)

        useEffect(() => {
            if (rooms === undefined || rooms[0].stage === "loading") {
                props.getRooms()
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
    
    const handleChange = (event) => {
        // console.log(name);
        props.setRoom(event.target.value)
        // props.setRoom(event.target.value);
    };

    const handleRightShift = () => {
        if (state.MeterArrayIndexStart === 1) {
            setState({
                ...state,
                MeterArrayIndexStart: 0
            });
        } else {
            setState({
                ...state,
                MeterArrayIndexStart: 1
            });
        }
    }



    return (
        <Grid item container direction={"column"} className={classes.roomSummeryWidget} spacing={3}>
            <Grid container item direction="row" xs>
                <Grid item xs style={{ paddingLeft: "24px" }}>
                    <Typography variant={"h4"}>Room</Typography>
                </Grid>
                <Grid item xs ></Grid>
                <Grid item>
                    <StandardRoundSelectForm className={classes.formControl} hiddenLabel >

                        <Select
                            value={pick}
                            onChange={handleChange}
                            inputProps={{
                                name: 'pick',
                                id: 'Room-Name',
                            }}
                        >
                            {state.rooms.map((Item, Index) => (
                                <MenuItem key={Index} value={Index}>{Item.name}</MenuItem>
                            ))}
                        </Select>
                    </StandardRoundSelectForm>
                </Grid>
            </Grid>
            <Grid item container direction={'row'} spacing={1}>
                <Grid item container direction={'column'} justify={"center"} spacing={0} xs={1} lg={1}>
                    <LeftRightButton color={"primary"} onClick={handleRightShift}><KeyboardArrowLeftIcon style={{ fontSize: 48 }} /></LeftRightButton>
                </Grid>
                {/* <Grid item container direction={"column"} xs lg> */}
                <Grid item container direction={'row'} xs lg={10}>
                    {/* <VerticleDividerStyled orientation={'vertical'} flexItem /> */}
                    {MeterArray.map((Component, index) => {
                        if (state.MeterArrayIndexStart === 1) {
                            if (index > 0) {
                                return (
                                    Component
                                );
                            }
                            return (<div key={index}></div>);
                        } else {
                            if (index < MeterArray.length - 1) {
                                return (
                                    Component
                                );
                            }
                            return (<div key={index}></div>);
                        }
                    })}
                    {/* <VerticleDividerStyled orientation={'vertical'} flexItem /> */}
                </Grid>
                {/* </Grid> */}
                <Grid item container direction={'column'} justify={"center"} xs={1} lg={1}>
                    <LeftRightButton color={"primary"} onClick={handleRightShift}><KeyboardArrowRightIcon style={{ fontSize: 48 }} /></LeftRightButton>
                </Grid>
            </Grid>
        </Grid>
    )
}


function mapStateToProps({ state }) {
    return { state };
}

const formedComponent = compose(
    connect(mapStateToProps, { getRooms: getRooms, setRoom: setRoom })
)(RoomSummery);

export default formedComponent;
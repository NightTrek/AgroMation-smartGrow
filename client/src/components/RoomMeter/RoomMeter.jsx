
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
// import moment from "moment";
import { connect, useSelector, shallowEqual } from 'react-redux';
import { compose } from "redux";
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'; //useTheme
import {
    Grid, Typography, Select, MenuItem, ListItemText, List, ListItem, ListItemIcon, Button, Modal, Backdrop, Fade,
    Box, Slider, Input, IconButton, Snackbar, CircularProgress
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import ReactSpeedometer from "react-d3-speedometer"
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { StandardRoundSelectForm } from "../../components/StandardSelect/StandardSelect.js";
import CancelIcon from '@material-ui/icons/Cancel';

//import firebase stuff
import { db } from "../../consts/firebase";


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

function FieldMeter(props) {
    const roomState = props.state;
    const classes = props.classes;
    const theme = props.theme;
    const UnitString = props.UnitString;

    
    const setType = () => {
        switch (props.type) {
            case "temp":
                return {
                    superMin: -30,
                    min: -2,
                    max: 2,
                    superMax: 30,
                    sliderMin: 0,
                    sliderMax:110,
                    output: {
                        tempSetPoint: props.setPoint,
                        tempMin: props.min,
                        tempMax: props.max,
                    }
                };

            case "humidity":
                return {
                    superMin: -30,
                    min: -5,
                    max: 5,
                    superMax: 30,
                    sliderMin: 0,
                    sliderMax:100,
                    output: {
                        humiditySetPoint: props.setPoint,
                        humidityMin: props.min,
                        humidityMax: props.max,
                    }
                };
            case "CO2":
                return {
                    superMin: -1000,
                    min: -100,
                    max: 100,
                    superMax: 1000,
                    sliderMin: 0,
                    sliderMax:6000,
                    output: {
                        CO2SetPoint: props.setPoint,
                        CO2Min: props.min,
                        CO2Max: props.max,
                    }
                };
            case "pressure":
                return {
                    superMin: -500,
                    min: -25,
                    max: 25,
                    superMax: 500,
                    sliderMin: 0,
                    sliderMax:1500,
                    output: {
                        pressureSetPoint: props.setPoint,
                        pressureMin: props.min,
                        pressureMax: props.max,
                    }
                };
        }
    }

    const TypeData = setType();

    //setPointStuff
    const [meterState, setMeterState] = React.useState({
        setPoint: props.setpoint,
        max: props.max,
        min: props.min,
        minMax: [props.min, props.max]
    });

    useEffect(() => {
        setMeterState({
            setPoint: props.setpoint,
            max: props.max,
            min: props.min,
            minMax: [props.min, props.max] 
        });
    }, [props])
    // console.log(props.rooms[props.pick].name)
    // console.log(meterState)
    // console.log([meterState.minMax[0] + TypeData.superMin,
    //     meterState.minMax[0], meterState.setPoint + TypeData.min, meterState.setPoint + TypeData.max,
    //     meterState.minMax[1], meterState.minMax[1] + TypeData.superMax])
    //slider handlers
    const handleSetPointSliderChange = (event, newValue) => {
        setMeterState({ ...meterState, setPoint: parseInt(newValue) });
    };

    const handleMinMaxSliderChange = (event, newValue) => {
        if (newValue[0] < meterState.setPoint && newValue[1] > meterState.setPoint) {
            setMeterState({ ...meterState, minMax: newValue });
        }

    };
    //input handlers
    const handleSetPointInputChange = (event) => {
        setMeterState({ ...meterState, setPoint: event.target.value === '' ? props.setPoint : Number(event.target.value) });
    };

    const handleMinInputChange = (event) => {
        let cMeterState = meterState.minMax;
        if (parseInt(event.target.value) < meterState.setPoint) {
            setMeterState({ ...meterState, minMax: [parseInt(event.target.value), cMeterState[1]] });
        }

    };

    const handleMaxInputChange = (event) => {
        let cMeterState = meterState.minMax;
        if (parseInt(event.target.value) > meterState.setPoint) {
            setMeterState({ ...meterState, minMax: [cMeterState[0], parseInt(event.target.value)] });
        }

    };

    //modal stuff
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (props.setpoint === meterState.setPoint) {
            setOpen(false);
        }
        else {
            props.handleAlertOpen("Changes have not been saved please hit set to save changes to controller")
            setOpen(false);
        }
    };

    //Label stuff
    const [Labels, setLabels] = React.useState([{}, {}, {}, {}, {}]);


    const handleMouseEnter = () => {
        setLabels([{
            text: `${props.setpoint + TypeData.superMin}${UnitString}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        }, {
            text: `${props.setpoint + TypeData.min}${UnitString}`,
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
            text: `${props.setpoint + TypeData.max}${UnitString}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        },
        {
            text: `${props.setpoint + TypeData.superMax}${UnitString}`,
            fontSize: "12px",
            position: "OUTSIDE",
            color: "white"
        }])
    }
    const handleMouseLeave = () => {
        setLabels([{}, {}, {}, {}, {}])
    }

    const handleSendChanges = () => {
        //verify there are changes
        if (meterState.setPoint == props.setpoint && meterState.minMax[0] == props.min && meterState.minMax[1] == props.max) {
            props.handleAlertOpen("Did  you forget to make the changes")
            return 0;
        }
        //verify the setpoint is above min
        if (meterState.setPoint < meterState.minMax[0]) {
            props.handleAlertOpen("Your setpoint must be above your minimum value")
            return 0;
        } //verify your setpoint is below max
        if (meterState.setPoint > meterState.minMax[1]) {
            props.handleAlertOpen("Your setpoint must be below your maximum value")
            return 0;
        }
        const roomRef = db.collection('Rooms').doc(props.rooms[props.pick].doc)
        db.runTransaction((transaction) => {
            return transaction.get(roomRef).then((roomDocSnapshot) => {
                if (!roomDocSnapshot.exists) {
                    throw "Document does not exist"
                }
                let data = roomDocSnapshot.data();
                //maybe check and see if the document needs to be updated
                if (data.setPoint === meterState.setPoint && data.tempMin === meterState.minMax[0] && data.tempMax === meterState.minMax[1]) {
                    return data;
                }
                //do the update and return output
                
                let output = {
                    ...data,
                    doc:props.rooms[props.pick].doc
                };
                for(let key in TypeData.output){
                    if(key.slice(-3) === "int"){
                        output[key] = parseInt(meterState.setPoint)
                    }
                    if(key.slice(-3) === "Min"){
                        output[key] = parseInt(meterState.minMax[0])
                    }
                    if(key.slice(-3) === "Max"){
                        output[key] = parseInt(meterState.minMax[1])
                    }
                }
                
                transaction.update(roomRef, output);
                return output;

            }).then((data) => {
                // console.log(data)
                let newReduxRoomArray = props.rooms
                newReduxRoomArray[props.pick] = data
                // console.log(newReduxRoomArray);
                props.setRoom(newReduxRoomArray);
                props.handleAlertOpen("Successfully updated room data", "success");
                setOpen(false);
            }).catch((err) => {
                props.handleAlertOpen("error during transaction");
                console.log(err);
            })
        })


    }

    return (
        <Grid container item sm={12} md={6} lg={3} direction={'column'} justify={'center'}>

            <Typography variant={"h6"} align={'center'}>{props.title}</Typography>
            <Grid item xs className={classes.meterContainer}>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <ReactSpeedometer
                        forceRender={true}
                        width={256}
                        needleTransitionDuration={2000}
                        needleTransition="easeElastic"
                        needleHeightRatio={0.7}
                        needleColor={theme.palette.text.main}
                        value={roomState.liveData[props.type]}
                        currentValueText={`${roomState.liveData[props.type]} ${props.UnitString}`}
                        minValue={meterState.minMax[0] + TypeData.superMin}
                        maxValue={meterState.minMax[1] + TypeData.superMax}
                        segments={5}
                        customSegmentStops={[meterState.minMax[0] + TypeData.superMin,
                        meterState.minMax[0], meterState.setPoint + TypeData.min, meterState.setPoint + TypeData.max,
                        meterState.minMax[1], meterState.minMax[1] + TypeData.superMax]}
                        segmentColors={[theme.palette.roomStatus.warning, theme.palette.primary.main, theme.palette.roomStatus.nominal, theme.palette.primary.main,
                        theme.palette.roomStatus.warning]}
                        customSegmentLabels={Labels}
                    />
                </div>
                <DiagnosticColorBar handleOpen={handleOpen} datapoint={roomState.liveData[props.type]} min={meterState.setPoint + TypeData.min} superMin={parseInt(meterState.minMax[0])}
                    max={meterState.setPoint + TypeData.max} superMax={parseInt(meterState.minMax[1])} setPoint={`${meterState.setPoint}${UnitString}`} />
                <Modal
                    aria-labelledby="Temperature setpoint modal"
                    aria-describedby="Set the temperature of controller"
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
                                        <Grid item> <h4>{props.longTitle}</h4></Grid>
                                        <Grid item xs> </Grid>
                                    </Grid>
                                    <Grid item container direction={'row'}>
                                        <Grid item xs>
                                            <Typography variant={"body1"}>SetPoint</Typography>
                                            <Slider
                                                value={typeof meterState.setPoint === 'number' ? meterState.setPoint : 0}
                                                onChange={handleSetPointSliderChange}
                                                aria-labelledby="setPoint-slider"
                                                min={TypeData.sliderMin}
                                                max={TypeData.sliderMax}
                                                metertype={'setPoint'}
                                                style={{ width: "95%" }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Input
                                                className={classes.input}
                                                value={meterState.setPoint}
                                                margin="dense"
                                                onChange={handleSetPointInputChange}
                                                metertype={'setPoint'}
                                                inputProps={{
                                                    step: 1,
                                                    min: TypeData.sliderMin,
                                                    max: TypeData.sliderMax,
                                                    type: 'number',
                                                    'aria-labelledby': 'input-slider',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item style={{ position: "relative" }}>
                                            <Typography variant={"caption"} style={{ padding: "4px", position: "absolute", top: "24px" }}> {UnitString}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item container direction={'row'} style={{ marginTop: "24px" }}>
                                        <Grid item>
                                            <Typography variant={"body1"}>Minimum</Typography>
                                            <Input
                                                className={classes.input}
                                                value={meterState.minMax[0]}
                                                margin="dense"
                                                onChange={handleMinInputChange}
                                                inputProps={{
                                                    step: 1,
                                                    min: TypeData.sliderMin,
                                                    max: TypeData.sliderMax,
                                                    type: 'number',
                                                    'aria-labelledby': 'min-input-slider',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item style={{ position: "relative" }}>
                                            <Typography variant={"caption"} style={{ padding: "4px", position: "absolute", top: "48px" }}> {UnitString}</Typography>
                                        </Grid>
                                        <Grid item xs>

                                            <Slider
                                                value={meterState.minMax}
                                                onChange={handleMinMaxSliderChange}
                                                aria-labelledby="min-slider"
                                                min={TypeData.sliderMin}
                                                max={TypeData.sliderMax}
                                                style={{ width: "95%", marginTop: "24px" }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant={"body1"}>Maximum</Typography>
                                            <Input
                                                className={classes.input}
                                                value={meterState.minMax[1]}
                                                margin="dense"
                                                onChange={handleMaxInputChange}
                                                metertype={'min'}
                                                inputProps={{
                                                    step: 1,
                                                    min: TypeData.sliderMin,
                                                    max: TypeData.sliderMax,
                                                    type: 'number',
                                                    'aria-labelledby': 'min-input-slider',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item style={{ position: "relative" }}>
                                            <Typography variant={"caption"} style={{ padding: "4px", position: "absolute", top: "48px" }}> {UnitString}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item container direction={"row"}>
                                    <Button variant={"outlined"} color={"primary"} onClick={handleSendChanges}>
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

FieldMeter.propTypes = {
    state: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired,
    pick: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    longTitle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    setpoint: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    UnitString: PropTypes.string.isRequired,
    handleAlertOpen: PropTypes.func.isRequired
}


export default FieldMeter;
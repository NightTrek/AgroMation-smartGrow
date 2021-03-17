import React, { useEffect } from 'react'
import { compose } from "redux";
import { connect, useSelector, shallowEqual } from 'react-redux'
import { Grid, Typography, List, ListItem, Button } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getRooms, setRoom } from "../../actions/roomActions";
import { withRouter } from "react-router";
// import {DeveloperID, AccountPassword} from "../../consts/talk2m";
// import axios from "axios";


const tempVariation = 5;
const humidityVariation = 2;
const co2Variation = 200;
const pressureVariation = 100;

const useStyles = makeStyles((theme) => ({
    LiveDataWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "128px",
        maxWidth: "1248px",
        minHeight: "128px",
        padding:"12px",
        // marginLeft:"32px",
    },
    iconButton: {
        color: "white",
    },
    pie: {
        width: "192px",
        height: "192px",
    },
    pieChart: {
        width: "192px",
        Height: "192px",
        position: "relative"
    },
    PieLabelPrimary: {
        position: "absolute",
        top: "25%",
        left: "40%",
        color: "white",
        fontSize: "32px",
    },
    PieLabel: {
        position: "absolute",
        top: "50%",
        left: "30%",
        color: "white",
    },
    PieRoomLabel: {
        position: "absolute",
        top: "70%",
        left: "30%",
    },

}));


const LiveDataWidget = (props) => {
    const theme = useTheme();
    const exampleLiveData = {
        roomName: props.roomName,
        Temp: 74,
        TempColor: theme.palette.roomStatus.warning,
        humidity: 32,
        humidityColor: theme.palette.primary.main,
        CO2Level: 2885,
        CO2Color: theme.palette.primary.main,
        PressureLevel: 1114,
        PressureColor: theme.palette.primary.main
    };
    const classes = useStyles();
    let LiveData = props.LiveData || exampleLiveData;

    let { rooms, pick, live } = useSelector(state => ({
        rooms: state.growRooms.rooms,
        pick: state.growRooms.roomIndex,
        live:   state.growRooms.Live,

    }), shallowEqual)

 

    //check if data has loaded and if not display loading text
    if (rooms === undefined || rooms.length === 0) {
        console.log("loading Room data")
        rooms = [
            {
                name: "Loading rooms",
                tempSetPoint: 72,
                humiditySetPoint: 44,
                CO2SetPoint: 3000,
                pressureSetPoint: 1114,
                stage: "loading",
                dateStarted: 1597017600,
                CloneTime: 864000,
                VegTime: 3024000,
                FlowerTime: 2419200,
                doc:0,
            },
        ]
        pick = 0;
    }

    //if liveData is present Set LiveData
    
    if(live && live.live && live.live[rooms[pick].doc] && typeof live.live[rooms[pick].doc].temp === 'number'){
        LiveData['Temp'] = live.live[rooms[pick].doc].temp
        LiveData['humidity'] = live.live[rooms[pick].doc].rh
        LiveData['CO2Level'] = live.live[rooms[pick].doc].co2
        LiveData['PressureLevel'] = live.live[rooms[pick].doc].vpd
    }
    if(rooms && live.live &&  !live.live[rooms[pick].doc]){
        LiveData = {
            roomName: rooms[pick].name,
            Temp: 0,
            TempColor: theme.palette.roomStatus.warning,
            humidity: 0,
            humidityColor: theme.palette.roomStatus.warning,
            CO2Level: 0,
            CO2Color: theme.palette.roomStatus.warning,
            PressureLevel: 0,
            PressureColor: theme.palette.roomStatus.warning
        };
    }

    const handleShowRoom = () => {
        // console.log(props)
        props.history.push("/rooms");
    
    }

    const tempColor = () => {
        // console.log(`pressure fault value ${LiveData['Temp']} SP: ${rooms[pick].tempSetPoint} min: ${rooms[pick].tempMin} Max: ${rooms[pick].tempMax}`)
        if (LiveData['Temp']) {
            let item = rooms[pick];
            //if its greater then the max or less then the min thats a fault
            if (LiveData['Temp'] > item.tempMax || LiveData['Temp'] < item.tempMin) {
                return theme.palette.roomStatus.warning;
                
            }
            // if the temp is greater then the setpoint b x or less then setpoint by x thats a warning
            if (LiveData['Temp'] > item.tempSetPoint+ tempVariation || LiveData['Temp'] < item.tempSetPoint - tempVariation) {
                return theme.palette.primary.main
                
            }else{
                return theme.palette.roomStatus.veg
                
            }
            
        }else{
            return theme.palette.roomStatus.warning;
            
        }
        
    }

    const humidityColor = () => {
        // console.log(`pressure fault value ${LiveData['Temp']} SP: ${rooms[pick].tempSetPoint} min: ${rooms[pick].tempMin} Max: ${rooms[pick].tempMax}`)
        if (LiveData['humidity']) {
            let item = rooms[pick];
            //if its greater then the max or less then the min thats a fault
            if (LiveData['humidity'] > item.humidityMax || LiveData['humidity'] < item.humidityMin) {
                return theme.palette.roomStatus.warning;
                
            }
            // if the temp is greater then the setpoint b x or less then setpoint by x thats a warning
            if (LiveData['humidity'] > item.humiditySetPoint+ humidityVariation || LiveData['humidity'] < item.humiditySetPoint - humidityVariation) {
                return theme.palette.primary.main
                
            }else{
                return theme.palette.roomStatus.veg
                
            }
            
        }else{
            return theme.palette.roomStatus.warning;
            
        }
        
    }
    const co2Color = () => {
        // console.log(`pressure fault value ${LiveData['Temp']} SP: ${rooms[pick].tempSetPoint} min: ${rooms[pick].tempMin} Max: ${rooms[pick].tempMax}`)
        if (LiveData['CO2Level']) {
            let item = rooms[pick];
            //if its greater then the max or less then the min thats a fault
            if (LiveData['CO2Level'] > item.CO2Max || LiveData['CO2Level'] < item.CO2Min) {
                return theme.palette.roomStatus.warning;
                
            }
            // if the temp is greater then the setpoint b x or less then setpoint by x thats a warning
            if (LiveData['CO2Level'] > item.CO2SetPoint+ co2Variation || LiveData['CO2Level'] < item.CO2SetPoint - co2Variation) {
                return theme.palette.primary.main
                
            }else{
                return theme.palette.roomStatus.veg
                
            }
            
        }else{
            return theme.palette.roomStatus.warning;
            
        }
        
    }
    const vpdColor = () => {
        // console.log(`pressure fault value ${LiveData['Temp']} SP: ${rooms[pick].tempSetPoint} min: ${rooms[pick].tempMin} Max: ${rooms[pick].tempMax}`)
        if (LiveData['PressureLevel']) {
            let item = rooms[pick];
            //if its greater then the max or less then the min thats a fault
            if (LiveData['PressureLevel'] > item.pressureMax || LiveData['PressureLevel'] < item.pressureMin) {
                return theme.palette.roomStatus.warning;
                
            }
            // if the temp is greater then the setpoint b x or less then setpoint by x thats a warning
            if (LiveData['PressureLevel'] > item.pressureSetPoint+ pressureVariation || LiveData['PressureLevel'] < item.pressureSetPoint - pressureVariation) {
                return theme.palette.primary.main
                
            }else{
                return theme.palette.roomStatus.veg
                
            }
            
        }else{
            return theme.palette.roomStatus.warning;
            
        }
        
    }

    const GenerateLiveDataColors = () => {
        LiveData['TempColor']       = tempColor();
        LiveData['humidityColor']   = humidityColor();
        LiveData['CO2Color']        = co2Color()
        LiveData['PressureColor']   = vpdColor()
        
        
    }

    GenerateLiveDataColors();
    // console.log(LiveData);
    

    return (
        <Grid item container className={classes.LiveDataWidget} direction={"column"}>
            <Grid item container direction={"row"}>
                    <Grid item xs={6} md={4} lg={2}>
                        <Typography variant={"h5"} style={{ paddingLeft: "12px" }}>Live Data:</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} lg={2}>
                        <Typography variant={"h6"} style={{ paddingLeft: "12px" }}>{rooms[pick].name}</Typography>
                    </Grid>
                    <Grid item xs>
                    </Grid>
            </Grid>
            <Grid item container direction={"row"}>
                <Grid item xs={6} sm={3} md>
                    <List>
                        <ListItem> Temperature</ListItem>
                        <ListItem> <Typography variant={"h4"} style={{ color: LiveData.TempColor }}> {LiveData.Temp}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item xs={6} sm={3} md>
                    <List>
                        <ListItem> Humidity</ListItem>
                        <ListItem> <Typography variant={"h4"} style={{ color: LiveData.humidityColor }}>{LiveData.humidity}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item xs={6} sm={3} md>
                    <List>
                        <ListItem> CO2 Level</ListItem>
                        <ListItem> <Typography variant={"h4"} style={{ color: LiveData.CO2Color }}>{LiveData.CO2Level}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item xs={6} sm={3} md>
                    <List>
                        <ListItem> Variable Pressure Deficit</ListItem>
                        <ListItem> <Typography variant={"h4"} style={{ color: LiveData.PressureColor }}>{LiveData.PressureLevel}</Typography></ListItem>
                    </List>
                </Grid>
            </Grid>
            <Grid item container direction={"row"}>
                <Grid item xs>
                </Grid>
                <Grid item xs sm={2} style={{paddingBottom:"24px"}}>
                    <Button variant="outlined" color="primary" onClick={handleShowRoom}>
                        Show Room
                    </Button>
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
)(LiveDataWidget);

export default withRouter(formedComponent);
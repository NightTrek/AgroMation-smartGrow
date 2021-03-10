import React, { useEffect } from 'react'
import { compose } from "redux";
import { connect, useSelector, shallowEqual } from 'react-redux'
import { Grid, Typography, List, ListItem, Button } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getRooms, setRoom } from "../../actions/roomActions";
import { withRouter } from "react-router";
// import {DeveloperID, AccountPassword} from "../../consts/talk2m";
// import axios from "axios";


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


// const EwonName = "Agro_Office";
// const EwonUser = "Agro";
// const EwonPass = "Agro2019!"; 

// const parseEwonLiveData = (rawData) => {
//     const liveData = {}
//     for(let i = 0; i<rawData.length;i++){
//         if(typeof rawData[i] === 'string'){
//             liveData[rawData[i]]= rawData[i+1]
//         }
//     }
//     return liveData

// }

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

    useEffect(() => {
        // axios.get(`https://m2web.talk2m.com/t2mapi/get/${EwonName}/rcgi.bin/ParamForm?AST_Param=$dtIV$ftT&t2maccount=agro&t2musername=daniel&t2mpassword=${AccountPassword}&t2mdeveloperid=${DeveloperID}&t2mdeviceusername=${EwonUser}&t2mdevicepassword=${EwonPass}`, {})
        // .then((res) => {
        //     let data = parseEwonLiveData(res.data.split(";"));

        //     console.log(data);
        //     LiveData.Temp = data.Temperature;
        //     LiveData.humidity = data.RH;
        //     LiveData.CO2Level = data.CO2;
        // }).catch((err) => {
        //    console.log(err); 
        // })
    })

    //check if data has loaded and if not display loading text
    if (rooms === undefined || rooms.length === 0) {
        console.log("loading Room data")
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
                doc:0,
            },
        ]
        pick = 0;
    }

    //if liveData is present Set LiveData
    
    if(live && live.live && live.live[rooms[pick].doc] && typeof live.live[rooms[pick].doc].temp === 'number'){
        console.log(live.live[rooms[pick].doc])
        LiveData['Temp'] = live.live[rooms[pick].doc].temp
        LiveData['humidity'] = live.live[rooms[pick].doc].rh
        LiveData['CO2Level'] = live.live[rooms[pick].doc].co2
        LiveData['PressureLevel'] = live.live[rooms[pick].doc].vpd
    } else if(!live.live[rooms[pick].doc]){
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

    const GenerateLiveDataColors = () => {
        if(!LiveData['Temp'] || LiveData['Temp'] > rooms[pick].tempMax || LiveData['Temp'] < rooms[pick].tempMin){
            LiveData['TempColor'] = theme.palette.roomStatus.warning
        }
        //Green state
        if(LiveData['Temp'] < rooms[pick].tempSetPoint+5 && LiveData['Temp'] > rooms[pick].tempSetPoint-5){
            LiveData['TempColor'] = theme.palette.roomStatus.veg
        }
        if(LiveData['Temp'] > rooms[pick].tempSetPoint+5 && LiveData['Temp'] < rooms[pick].tempSetPoint-5){
            LiveData['TempColor'] = theme.palette.primary.main
        }
        //humidity =============================================================================================
        if(!LiveData['humidity'] || LiveData['humidity'] > rooms[pick].humidityMax || LiveData['humidity'] < rooms[pick].humidityMin){
            LiveData['humidityColor'] = theme.palette.roomStatus.warning
        }
        //Green state
        if(LiveData['humidity'] < rooms[pick].humiditySetPoint+5 && LiveData['humidity'] > rooms[pick].humiditySetPoint-5){
            LiveData['humidityColor'] = theme.palette.roomStatus.veg
        }
        if(LiveData['humidity'] > rooms[pick].humiditySetPoint+5 && LiveData['humidity'] < rooms[pick].humiditySetPoint-5){
            LiveData['humidityColor'] = theme.palette.primary.main
        }
        //co2 =============================================================================================
        if(!LiveData['CO2Level'] || LiveData['CO2Level'] > rooms[pick].CO2Max || LiveData['CO2Level'] < rooms[pick].CO2Min){
            LiveData['CO2Color'] = theme.palette.roomStatus.warning
        }
        //Green state
        if(LiveData['CO2Level'] < rooms[pick].CO2SetPoint+200 && LiveData['CO2Level'] > rooms[pick].CO2SetPoint-200){
            LiveData['CO2Color'] = theme.palette.roomStatus.veg
        }
        if(LiveData['CO2Level'] > rooms[pick].CO2SetPoint+200 && LiveData['CO2Level'] < rooms[pick].CO2SetPoint-200){
            LiveData['CO2Color'] = theme.palette.primary.main
        }
        //co2 =============================================================================================
        if(!LiveData['PressureLevel'] || LiveData['PressureLevel'] > rooms[pick].pressureMax || LiveData['PressureLevel'] < rooms[pick].pressureMin){
            LiveData['PressureColor'] = theme.palette.roomStatus.warning
        }
        //Green state
        if(LiveData['PressureLevel'] < rooms[pick].pressureSetPont+200 && LiveData['PressureLevel'] > rooms[pick].pressureSetPont-200){
            LiveData['PressureColor'] = theme.palette.roomStatus.veg
        }
        if(LiveData['PressureLevel'] > rooms[pick].pressureSetPont+200 && LiveData['PressureLevel'] < rooms[pick].pressureSetPont-200){
            LiveData['PressureColor'] = theme.palette.primary.main
        }
        
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
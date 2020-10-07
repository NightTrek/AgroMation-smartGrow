import React, { useEffect } from 'react'
import { compose } from "redux";
import { connect, useSelector, shallowEqual } from 'react-redux'
import { Grid, Typography, List, ListItem, Button } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getRooms, setRoom } from "../../actions/roomActions";
import { withRouter } from "react-router";



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
    const LiveData = props.LiveData || exampleLiveData;

    let { rooms, pick, user } = useSelector(state => ({
        rooms: state.growRooms.rooms,
        pick: state.growRooms.roomIndex,
        user: state.users.user

    }), shallowEqual)

    // useEffect(() => {
    //     if (rooms === undefined || rooms[0].stage === "loading") {
    //         console.log(user)
    //         if(user.uid !== undefined){
    //             props.getRooms(user.uid)
    //         }
    //     }
    // })

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
            },
        ]
        pick = 0;
    }

    const handleShowRoom = () => {
        console.log(props)
        props.history.push("/rooms");
    }


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
                        <ListItem> CO2 level</ListItem>
                        <ListItem> <Typography variant={"h4"} style={{ color: LiveData.CO2Color }}>{LiveData.CO2Level}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item xs={6} sm={3} md>
                    <List>
                        <ListItem> Pressure level</ListItem>
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
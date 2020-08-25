import React from 'react'
import { connect } from 'react-redux'
import { Grid, Typography, List, ListItem, Button } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';






const useStyles = makeStyles((theme) => ({
    LiveDataWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "256px",
        maxWidth: "1248px",
        minHeight: "128px",
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

const colorPicker = () => {
    return
}


export const LiveDataWidget = (props) => {
    const theme = useTheme();
    const exampleLiveData = {
        roomName: "Room Alpha",
        Temp: 74,
        TempColor: theme.palette.roomStatus.warning,
        humidity: 32,
        humidityColor: theme.palette.primary.main,
        CO2Level: 2885,
        CO2Color: theme.palette.primary.main
    };
    const classes = useStyles();
    const LiveData = props.LiveData || exampleLiveData;



    return (
        <Grid item container className={classes.LiveDataWidget} direction={"column"}>
            <Grid item container direction={"row"}>
                <Grid container item xs>
    <Typography variant={"h5"} style={{ paddingLeft: "12px" }}>Live Data: {LiveData.roomName}</Typography>
                </Grid>
                <Grid item xs>
                    <List>
                        <ListItem> Temprature</ListItem>
                        <ListItem> <Typography variant={"h6"} style={{ color: LiveData.TempColor }}> {LiveData.Temp}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item xs>
                    <List>
                        <ListItem> Humidity</ListItem>
                        <ListItem> <Typography variant={"h6"} style={{ color: LiveData.humidityColor }}>{LiveData.humidity}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item xs>
                    <List>
                        <ListItem> CO2 level</ListItem>
                        <ListItem> <Typography variant={"h6"} style={{ color: LiveData.CO2Color }}>{LiveData.CO2Level}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item xs={1}>
                    <Button variant="outlined" color="primary">
                    Show Room
                </Button></Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LiveDataWidget)

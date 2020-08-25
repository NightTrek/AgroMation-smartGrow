import React from 'react'
import { connect } from 'react-redux'
import { Grid, Typography, Button } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { VictoryPie } from "victory";

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const exampleProgressData = {
    roomName: "Room Alpha",
    stage: "Flower",
    currentData: 32,
    stageCompletion: 40,
};


const useStyles = makeStyles((theme) => ({
    ProgressWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "256px",
        maxWidth: "416px",
        minHeight: "364px",
        marginTop: "8px",
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
        position:"relative"
    },
    PieLabelPrimary:{
        position:"absolute",
        top:"25%",
        left:"40%",
        color:"white",
        fontSize:"32px",
    },
    PieLabel:{
        position:"absolute",
        top:"50%",
        left:"30%",
        color:"white",
    },
    PieRoomLabel:{
        position:"absolute",
        top:"70%",
        left:"30%",
    },

}));


export const HighestProgress = (props) => {

    const classes = useStyles();
    const Progress = props.Progress || exampleProgressData;
    const theme = useTheme();
    const progressColorScale = [ theme.palette.roomStatus.warning, theme.palette.primary.main,];
    const data= [{ x: "Current", y: Progress.currentData },
    { x: "Total", y: Progress.stageCompletion-Progress.currentData},
    ]
    return (
        <Grid item container className={classes.ProgressWidget} direction={"column"}>
            {/* widget Top bar menu */}
            <Grid container item xs direction={"row"} className={classes.TopBar}>
                <Grid container item xs={8}>
                    <Typography variant={"h5"} style={{ paddingLeft: "12px" }}>Highest Progress</Typography>
                </Grid>
                <Grid container item xs>

                </Grid>
                <Grid container item xs={1}>
                    <IconButton aria-label="Widget Settings" color="primary" className={classes.iconButton}><MoreVertIcon /></IconButton>
                </Grid>
            </Grid>
            {/* widget Content */}
            <Grid container item xs direction={"row"} justify={"center"}>
                <Grid item className={classes.pieChart}>
                    <VictoryPie
                        // padAngle={({ datum }) => datum.y}
                        className={classes.Pie}
                        innerRadius={100}
                        startAngle={90}
                        endAngle={-90}
                        sortOrder={"ascending"}
                        sortKey={"y"}
                        colorScale={progressColorScale}
                        data={data}
                        // labelRadius={({ innerRadius }) => innerRadius - 50 } 
                        labels={({ datum }) => ""} //datum.y.toString()
                        style={{ labels: { fill: "white", fontSize: "32px" } }}
                        // labelComponent={<VictoryLabel text={`${Progress.currentData}/${Progress.stageCompletion} days`} textAnchor={"middle"} x={"50%"} y={"50%"}/>}
                    >
                        </VictoryPie>
                        <Typography className={classes.PieLabelPrimary}>{Progress.currentData}</Typography>
                        <Typography className={classes.PieLabel}>{Progress.currentData}/{Progress.stageCompletion} days</Typography>
    <Typography className={classes.PieRoomLabel}>{props.roomName}</Typography>
                </Grid>
            </Grid>
            <Grid container item xs direction={"row"} justify={"center"}>
                <Grid item >
                    <Button variant="outlined" color="primary">
                        Show more info
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(HighestProgress)

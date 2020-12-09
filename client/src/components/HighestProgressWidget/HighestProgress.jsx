import React from 'react'
import { connect, useSelector, shallowEqual } from 'react-redux';
import { compose } from "redux";
import { withRouter } from "react-router";
import { Grid, Typography, Button } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { VictoryPie } from "victory";

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { getRooms, setRoom } from "../../actions/roomActions";


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
        minWidth: "192px",
        maxWidth: "416px",
        minHeight: "364px",
        marginTop: "8px",
        display: "flex",
        flexGrow: 1,
        // marginLeft:"32px",
        '@media (max-width: 1200px)': {
            minWidth: "192px",
            maxWidth: "360px",

        },
        '@media (max-width: 1000px)': {
            minWidth: "192px",
            maxWidth: "256px",

        },
        '@media (max-width: 900px)': {
            minWidth: "128",
            maxWidth: "192px",

        },
        '@media (max-width: 640px)': {
            minWidth: "256px",
            maxWidth: "512px",

        },
        '@media (max-width: 460px)': {
            minWidth: "192px",
            maxWidth: "300px",

        },
        '@media (max-width: 400px)': {
            minWidth: "128px",
            maxWidth: "256px",

        },
        '@media (max-width: 330px)': {
            minWidth: "92px",
            maxWidth: "212px",

        }
    },
    title: {
        // '@media (max-width: 460px)':{
        //     fontSize: 14,

        // },
        // '@media (max-width: 400px)':{
        //     fontSize: 14,

        // },
        // '@media (max-width: 330px)':{
        //     fontSize: 12,

        // }
    },
    iconButton: {
        color: "white",
        width: "48px",
        height: "48px",
        marginRight: "12px"
    },
    pie: {
        width: "192px",
        height: "192px",
        // paddingBottom: "128px",
        // marginBottom:"-512px"
    },
    pieChart: {
        width: "192px",
        // Height: "12px",
        paddingBottom:"12px",
        position: "relative"
    },
    PieLabelPrimary: {
        position: "absolute",
        top: "28%",
        left: "0",
        color: "white",
        fontSize: "32px",
        '@media (max-width: 460px)': {



        },
        '@media (max-width: 400px)': {


        },
        '@media (max-width: 330px)': {


        }
    },
    PieLabel: {
        position: "absolute",
        top: "50%",
        left: "0",
        color: "white",
        '@media (max-width: 460px)': {



        },
        '@media (max-width: 400px)': {


        },
        '@media (max-width: 330px)': {


        }
    },
    PieRoomLabel: {
        position: "absolute",
        top: "70%",
        left: "0",
        '@media (max-width: 460px)': {



        },
        '@media (max-width: 400px)': {


        },
        '@media (max-width: 330px)': {


        }
    },

}));


const HighestProgress = (props) => {

    const classes = useStyles();
    const Progress = props.Progress || exampleProgressData;
    const theme = useTheme();
    const progressColorScale = [theme.palette.roomStatus.warning, theme.palette.primary.main,];


    let { rooms, pick } = useSelector(state => ({
        rooms: state.growRooms.rooms,
        pick: state.growRooms.roomIndex,

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

    const data = [{ x: "Current", y: Progress.currentData },
    { x: "Total", y: Progress.stageCompletion - Progress.currentData },
    ];

    const handleShowRoom = () => {
        console.log(props)
        props.history.push("/rooms");
    }

    return (
        <Grid item container className={classes.ProgressWidget} direction={"row"}>
            {/* widget Top bar menu */}
            {/* <Grid container item xs direction={"row"} className={classes.TopBar} wrap={"nowrap"}> */}
            <Grid container item xs={10} sm={8} md={7}>
                <Typography variant={"h5"} className={classes.title} style={{ paddingLeft: "12px" }}>Highest Progress</Typography>
            </Grid>
            <Grid container item xs={2} sm={4} md={5}>
                <IconButton aria-label="Widget Settings" color="primary" className={classes.iconButton}><MoreVertIcon /></IconButton>
            </Grid>
            {/* </Grid> */}
            {/* widget Content */}
            
            <Grid container item className={classes.pieChart} direction={"column"} spacing={1} xs={12}>
                <Grid item>
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
                </Grid>
                <Grid item container direction={"row"} justify={"center"} className={classes.PieLabelPrimary}>
                    <Typography style={{fontSize: "32px", color:"white"}}>{Progress.currentData}</Typography>
                </Grid>
                <Grid item container direction={"row"} justify={"center"} className={classes.PieLabel}>
                    <Typography >{Progress.currentData}/{Progress.stageCompletion} days</Typography>
                </Grid>
                <Grid item container direction={"row"} justify={"center"} className={classes.PieRoomLabel}>
                    <Typography >{rooms[pick].name}</Typography>
                </Grid>



            </Grid>
            {/* </Grid> */}
            <Grid container item xs={12} direction={"row"} justify={"center"}>
                <Grid item  style={{ marginBottom: "36px", }}>
                    <Button variant="outlined" color="primary" onClick={handleShowRoom}>
                        Show more info
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
)(HighestProgress);

export default withRouter(formedComponent);
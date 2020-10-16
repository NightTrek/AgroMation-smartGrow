import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'; //useTheme
import { VictoryChart, VictoryLine, VictoryAxis, VictoryVoronoiContainer,VictoryTooltip } from 'victory';

const exampleTempData = [
    { x: 1300, y: 74 , sp: 74 },
    { x: 1305, y: 73 , sp: 74 },
    { x: 1310, y: 74 , sp: 74 },
    { x: 1315, y: 73 , sp: 74 },
    { x: 1320, y: 73 , sp: 74 },
    { x: 1325, y: 74 , sp: 74 },
    { x: 1330, y: 73 , sp: 74 },
    { x: 1335, y: 74 , sp: 74 },
    { x: 1340, y: 73 , sp: 74 },
    { x: 1345, y: 73 , sp: 74 },
    { x: 1350, y: 74 , sp: 74 },
    { x: 1355, y: 73 , sp: 74 },
    { x: 1400, y: 73 , sp: 74 },
    { x: 1405, y: 72 , sp: 74 },
    { x: 1410, y: 72 , sp: 74 },
    { x: 1415, y: 74 , sp: 74 },
    { x: 1420, y: 73 , sp: 74 },
    { x: 1425, y: 73 , sp: 74 },
    { x: 1430, y: 74 , sp: 74 },
    { x: 1435, y: 73 , sp: 74 },
    { x: 1440, y: 73 , sp: 74 },
    { x: 1445, y: 72 , sp: 74 },
    { x: 1450, y: 72 , sp: 74 },
    { x: 1455, y: 71 , sp: 74 },
    { x: 1500, y: 72 , sp: 74 },
];
const exampleHumidityData = [
    { x: 1300, y: 35 , sp: 44 },
    { x: 1305, y: 35 , sp: 44 },
    { x: 1310, y: 34 , sp: 44 },
    { x: 1315, y: 35 , sp: 44 },
    { x: 1320, y: 35 , sp: 44 },
    { x: 1325, y: 35 , sp: 44 },
    { x: 1330, y: 36 , sp: 44 },
    { x: 1335, y: 36 , sp: 44 },
    { x: 1340, y: 37 , sp: 44 },
    { x: 1345, y: 37 , sp: 44 },
    { x: 1350, y: 37 , sp: 44 },
    { x: 1355, y: 39 , sp: 44 },
    { x: 1400, y: 39 , sp: 44 },
    { x: 1405, y: 38 , sp: 44 },
    { x: 1410, y: 37 , sp: 44 },
    { x: 1415, y: 37 , sp: 44 },
    { x: 1420, y: 36 , sp: 44 },
    { x: 1425, y: 37 , sp: 44 },
    { x: 1430, y: 38 , sp: 44 },
    { x: 1435, y: 39 , sp: 44 },
    { x: 1440, y: 39 , sp: 44 },
    { x: 1445, y: 40 , sp: 44 },
    { x: 1450, y: 41 , sp: 44 },
    { x: 1455, y: 41 , sp: 44 },
    { x: 1500, y: 42 , sp: 44 },
];
const exampleCO2Data = [
    { x: 1300, y: 3000 , sp: 3000 },
    { x: 1305, y: 3000 , sp: 3000 },
    { x: 1310, y: 2970 , sp: 3000 },
    { x: 1315, y: 3000 , sp: 3000 },
    { x: 1320, y: 3000 , sp: 3000 },
    { x: 1325, y: 3000 , sp: 3000 },
    { x: 1330, y: 3110, sp: 3000 },
    { x: 1335, y: 3110, sp: 3000 },
    { x: 1340, y: 2985, sp: 3000 },
    { x: 1345, y: 2955, sp: 3000 },
    { x: 1350, y: 2935, sp: 3000 },
    { x: 1355, y: 2892 , sp: 3000 },
    { x: 1400, y: 2930 , sp: 3000 },
    { x: 1405, y: 2950 , sp: 3000 },
    { x: 1410, y: 2945, sp: 3000 },
    { x: 1415, y: 2945, sp: 3000 },
    { x: 1420, y: 3110, sp: 3000 },
    { x: 1425, y: 2945, sp: 3000 },
    { x: 1430, y: 3010 , sp: 3000 },
    { x: 1435, y: 3072 , sp: 3000 },
    { x: 1440, y: 2999 , sp: 3000 },
    { x: 1445, y: 3042 , sp: 3000 },
    { x: 1450, y: 2964 , sp: 3000 },
    { x: 1455, y: 2910 , sp: 3000 },
    { x: 1500, y: 2999 , sp: 3000 },
];
const examplePressureData = [
    { x: 1300, y: 1114 , sp: 1114 },
    { x: 1305, y: 1114 , sp: 1114 },
    { x: 1310, y: 1168 , sp: 1114 },
    { x: 1315, y: 1114 , sp: 1114 },
    { x: 1320, y: 1114 , sp: 1114 },
    { x: 1325, y: 1114 , sp: 1114 },
    { x: 1330, y: 1100, sp: 1114 },
    { x: 1335, y: 1013, sp: 1114 },
    { x: 1340, y: 1043, sp: 1114 },
    { x: 1345, y: 1063, sp: 1114 },
    { x: 1350, y: 1073, sp: 1114 },
    { x: 1355, y: 1063 , sp: 1114 },
    { x: 1400, y: 1083 , sp: 1114 },
    { x: 1405, y: 1093 , sp: 1114 },
    { x: 1410, y: 1023, sp: 1114 },
    { x: 1415, y: 1083, sp: 1114 },
    { x: 1420, y: 1113, sp: 1114 },
    { x: 1425, y: 1093, sp: 1114 },
    { x: 1430, y: 1083 , sp: 1114 },
    { x: 1435, y: 1123 , sp: 1114 },
    { x: 1440, y: 1113 , sp: 1114 },
    { x: 1445, y: 1119 , sp: 1114 },
    { x: 1450, y: 1138 , sp: 1114 },
    { x: 1455, y: 1111 , sp: 1114 },
    { x: 1500, y: 1093 , sp: 1114 },
];

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}


// const getDomain = (tempData, min, max) =>{
//     let sum = 0;
//     let index = 0;
//     tempData.map((item, Index) => {
//         sum+= item;
//         index = Index
//         return item;
//     });
//     return [sum/index-min,sum/index+max]
// }


const useStyles = makeStyles((theme) => ({
    ChartContainer: {
        // background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "624px",
        minHeight:"192px",
        height: "auto",
        marginTop:"24px",
        '@media (max-width: 950px)': {
            minWidth: "512px",

        },
        '@media (max-width: 750px)': {
            minWidth: "448px",

        },
        '@media (max-width: 550px)': {
            minWidth: "320px",
            marginLeft:"-24px"

        },
        '@media (max-width: 450px)': {
            minWidth: "256px",


        },
        '@media (max-width: 370px)': {
            minWidth: "192px",
        }
    },
    ChartTitle:{
        '@media (max-width: 550px)': {
            fontSize:"24px"

        },
        '@media (max-width: 450px)': {
            fontSize:"20px"


        },
        '@media (max-width: 370px)': {
            fontSize:"18px"
        }
    },
    buttonArea:{
        minWidth:"100%",
        marginLeft:"24px",
        '@media (max-width: 550px)': {
            marginLeft:"12px",

        },
        '@media (max-width: 450px)': {
            marginLeft:"0px",


        },
        '@media (max-width: 370px)': {
            marginLeft:"-12px",
        }
    },
    ChartButtonText:{
        '@media (max-width: 550px)': {
            fontSize:"16px"

        },
        '@media (max-width: 450px)': {
            fontSize:"14px"


        },
        '@media (max-width: 370px)': {
            fontSize:"12px"
        }
    },

}));


export const PrimaryLineChart = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const tempData = props.tempData || exampleTempData;
    const tempDomain = [60, 90];
    const humidityData = props.humidityData || exampleHumidityData;
    
    const humidityDomain = [60, 90];
    const co2Data = props.co2Data || exampleCO2Data;
    const co2Domain = [2000,4000];
    const pressureData = props.pressureData || examplePressureData;
    const pressureDomain = [950, 1200]
    const [state, setState] = useState({
        dataSet: tempData,
        dataType:"Temperature",
        domain:tempDomain,
        unit:" °F",
    });
    // console.log(state.dataSet);
    //react media queries that decide if the chart is responsive or static using a custom hook to get window size
    /// sorry about these javascript if statement based media queries not getting paid by the hour apparently despite it being in the contract
    const [width] = useWindowSize(); //also has height available if needed
    let adjustedWidth = 0;    
    let responsiveChart = false;

    const setAdjustedWidth = (width) => {
        if(width>1400){
            // console.log("1200");
            adjustedWidth = 1200;
            responsiveChart=false;
        }
        else if(width>1300){
            // console.log("1000");
            adjustedWidth = 1100;
            responsiveChart=false;
        }
        else if(width>1250){
            // console.log("1000");
            adjustedWidth = 1050;
            responsiveChart=false;
        }
        else if(width>1200){
            // console.log("1000");
            adjustedWidth = 1000;
            responsiveChart=false;
        }
        else if(width>1100){
            // console.log("900");
            adjustedWidth = 950
            responsiveChart=false;
        }
        else if(width>1000){
            // console.log("1000");
            adjustedWidth = 850;
            responsiveChart=false;
        }
        else if(width>950){
            // console.log("1000");
            adjustedWidth = 800;
            responsiveChart=false;
        }
        else if(width>900){
            adjustedWidth = 750
        }
        else if(width>850){
            adjustedWidth = 700
        }
        else if(width<800){
            responsiveChart=true;
        }
        else{
            adjustedWidth = 400;
            // console.log("base case")
        }
    }
    setAdjustedWidth(width);
            
    let chartInputProps = {
        containerComponent:<VictoryVoronoiContainer  />,
        responsive:true,
    }
    if(!responsiveChart){
        chartInputProps.width = adjustedWidth;
    }

    
    return (
        <Grid container item direction={"column"}>
            <Grid container item direction={"row"} xs style={{marginLeft:"24px", marginTop:"12px"}}>
                <Typography variant={"h4"} className={classes.ChartTitle}>{state.dataType}</Typography>
            </Grid>
            <Grid container item direction={"row"} xs className={classes.ChartContainer}>
                    <VictoryChart
                        {...chartInputProps}
                       >
                        <VictoryAxis
                            dependentAxis
                            domain={state.domain}
                            offsetY={200}
                            standalone={false}
                            style={{
                                axis: { stroke: theme.palette.secondary.dark, color: "#ffffff" },
                                axisLabel: { fontSize: 20, padding: 30, color: "#ffffff" },
                                grid: { stroke: ({ tick }) => tick > 0.5 ? theme.palette.secondary.dark : "grey" },
                                tickLabels: { fontSize: 12, fill: "#ffffff" }
                            }}
                        />
                        <VictoryAxis
                            domain={[1300, 1500]}
                            offsetX={200}
                            orientation="top"
                            standalone={false}
                            style={{
                                axis: { stroke: theme.palette.secondary.dark, color: "#ffffff" },
                                axisLabel: { fontSize: 20, padding: 30, color: "#ffffff" },
                                grid: { stroke: ({ tick }) => tick > 0.5 ? theme.palette.secondary.dark : "grey" },
                                tickLabels: { fontSize: 12, fill: "#ffffff" }
                            }}
                        />
                        <VictoryLine style={{
                            data: { stroke: theme.palette.roomStatus.warning },
                            parent: {
                                border: `1px solid white`,
                                color: "white",
                            },
                            labels: {
                                color: "white"
                            }
                        }} data={state.dataSet} interpolation="monotoneX" width={512} labels={({ datum }) => `${datum.y}${state.unit}`} labelComponent={<VictoryTooltip/>} />
                        <VictoryLine style={{
                            data: { stroke: theme.palette.roomStatus.veg },
                            parent: {
                                border: `1px solid white`,
                                color: "white",
                            },
                            labels: {
                                color: "white"
                            }
                        }} data={state.dataSet.map((item) => {
                            return({x:item.x,y:item.sp})
                            })} interpolation="monotoneX" labels={({ datum }) => `SetPoint ${datum.y}`} labelComponent={<VictoryTooltip/>}/>
                    </VictoryChart>      
            </Grid>
            <Grid container item direction={"row"} xs={1} justify={'center'} className={classes.buttonArea} >
                        <Grid item xs={6} sm={4} md={2} style={{padding:"8px"}}>
                            <Button variant={"outlined"} color={"primary"} className={classes.ChartButtonText}  id={"Temp"} value="temp" onClick={e => {setState({...state, dataSet:tempData,dataType:"Temprature",domain:tempDomain, unit:" °F",})}}>Temp</Button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} style={{padding:"8px"}}>
                            <Button variant={"outlined"} color={"primary"} className={classes.ChartButtonText} id={"Humidity"} onClick={e => {setState({...state, dataSet:humidityData,dataType:"Humidity",domain:humidityDomain,unit:" %",})}}>Humidity</Button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} style={{padding:"8px"}}> 
                            <Button variant={"outlined"} color={"primary"} className={classes.ChartButtonText} id={"CO2"} onClick={e => {setState({...state, dataSet:co2Data,dataType:"CO2 Level",domain:co2Domain,unit:" ppm",})}}>CO2 Level</Button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} style={{padding:"8px"}}>
                            <Button variant={"outlined"} color={"primary"} className={classes.ChartButtonText} id={"Pressure"} onClick={e => {setState({...state, dataSet:pressureData,dataType:"Pressure Level",domain:pressureDomain,unit:" mbar"})}}>Pressure</Button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} style={{padding:"8px"}}>
                            <Button variant={"outlined"} color={"primary"} className={classes.ChartButtonText} id={"Lights"} disabled={true} >Lights</Button>
                        </Grid>
                        <Grid item xs={6} sm={4} md={2} style={{padding:"8px"}}>
                            <Button variant={"outlined"} color={"primary"} className={classes.ChartButtonText} id={"Warnings"} disabled={true} >Warnings</Button>
                        </Grid>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryLineChart)

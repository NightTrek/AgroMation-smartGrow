import React, { useLayoutEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Grid, Button } from '@material-ui/core'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'; //useTheme
import { VictoryChart, VictoryLine, VictoryAxis, VictoryContainer } from 'victory';

const exampleData = [
    { x: 1300, y: 74 },
    { x: 1305, y: 73 },
    { x: 1310, y: 74 },
    { x: 1315, y: 73 },
    { x: 1320, y: 73 },
    { x: 1325, y: 74 },
    { x: 1330, y: 73 },
    { x: 1335, y: 74 },
    { x: 1340, y: 73 },
    { x: 1345, y: 73 },
    { x: 1350, y: 74 },
    { x: 1355, y: 73 },
    { x: 1400, y: 73 },
    { x: 1405, y: 72 },
    { x: 1410, y: 72 },
]



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





const useStyles = makeStyles((theme) => ({
    ChartContainer: {
        // background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "624px",
        maxHeight: "442px",
        color: "white",
    },

}));


export const PrimaryLineChart = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [state, setState] = useState({
        dataSet: exampleData,
    });
    const [width, height] = useWindowSize();
    let adjustedWidth = 0;

    let responsiveChart = false;

    if(width>1400){
        console.log("1200");
        adjustedWidth = 1200;
        responsiveChart=false;
    }
    
    else if(width>1200){
        console.log("1000");
        adjustedWidth = 1100;
        responsiveChart=false;
    }
    else if(width>1000){
        console.log("900");
        adjustedWidth = 900
        responsiveChart=false;
    }
    else if(width>850){
        adjustedWidth = 800
    }
    else if(width<850){
        responsiveChart=true;
    }
    else{
        adjustedWidth = 400;
        console.log("base case")
    }
            
  

    console.log(`vw ${width}`);
    console.log(adjustedWidth);
    return (
        <Grid container item direction={"column"}>
            <Grid container item direction={"row"} xs={1}>

            </Grid>
            <Grid container item direction={"row"} xs>
                <Grid item className={classes.ChartContainer}>
                    <VictoryChart
                        containerComponent={<VictoryContainer responsive={responsiveChart} />}
                       width={responsiveChart ? 400: adjustedWidth}>
                        <VictoryAxis
                            dependentAxis
                            domain={[20, 100]}
                            offsetY={200}
                            standalone={false}
                            style={{
                                axis: { stroke: "#ffffff", color: "#ffffff" },
                                axisLabel: { fontSize: 20, padding: 30, color: "#ffffff" },
                                grid: { stroke: ({ tick }) => tick > 0.5 ? theme.palette.primary.main : "grey" },
                                tickLabels: { fontSize: 12, fill: "#ffffff" }
                            }}
                        />
                        <VictoryAxis
                            domain={[1300, 1500]}
                            offsetX={200}
                            orientation="top"
                            standalone={false}
                            style={{
                                axis: { stroke: "#ffffff", color: "#ffffff" },
                                axisLabel: { fontSize: 20, padding: 30, color: "#ffffff" },
                                grid: { stroke: ({ tick }) => tick > 0.5 ? theme.palette.primary.main : "grey" },
                                tickLabels: { fontSize: 12, fill: "#ffffff" }
                            }}
                        />
                        <VictoryLine style={{
                            data: { stroke: theme.palette.primary.main },
                            parent: {
                                border: `1px solid white`,
                                color: "white",
                            },
                            labels: {
                                color: "white"
                            }
                        }} data={state.dataSet} domain={{ x: [1300, 1500], y: [20, 100] }} interpolation="natural" width={512} />
                    </VictoryChart>
                </Grid>
            </Grid>
            <Grid container item direction={"row"} xs={1} >
                        <Grid item xs={2}>
                            <Button variant={"outlined"} color={"primary"}>Temp</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant={"outlined"} color={"primary"}>Temp</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant={"outlined"} color={"primary"}>Temp</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant={"outlined"} color={"primary"}>Temp</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant={"outlined"} color={"primary"}>Temp</Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant={"outlined"} color={"primary"}>Temp</Button>
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

import React from 'react'
import PropTypes from 'prop-types'

import { VictoryPie, VictoryLabel } from "victory";
import { Grid, Box, Typography, List, Divider } from "@material-ui/core"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';





const sampleTempData = [{ x: "Fault", y: 1, label: "Fault" },
{ x: "Warning", y: 2, label: "Warning" },
{ x: "Nominal", y: 5, label: "Nominal" }
];
const sampleHumidityData = [{ x: 1, y: 1, label: "Fault" },
{ x: 2, y: 1, label: "Warning" },
{ x: 3, y: 6, label: "Nominal" }
];
const sampleProgressData = [{ x: 1, y: 1, label: "Clone" },
{ x: 2, y: 3, label: "Veg" },
{ x: 3, y: 4, label: "Flower" }
];
const sampleCO2Data = [{ x: 1, y: 1, label: "Fault" },
{ x: 2, y: 1, label: "Warning" },
{ x: 3, y: 6, label: "Nominal" }
];



const useStyles = makeStyles((theme) => ({
    dashboardSummery: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main
    },
    formControl: {
        color: theme.palette.text.main
    },
    chartLabel: {
        // textAlign: 'center',
    },
    pieChart: {
        width: "192px",
        height: "192px"
    },
    legendList: {
        paddingTop: "2px",
        paddingBottom: "2px"
    },
    legendColor: {
        height: "12px",
        width: "12px",
        marginRight: "12px"
    },
    legendItem: {
        paddingTop: "2px",
        paddingBottom: "2px"

    },
    Divider: {
        background: "white",
    },

    color: {
        background: theme.palette.roomStatus.veg
    },

}));

const DashboardPieChart = (props) => {
    const classes = props.classes;
    const theme = props.theme;

    return (
        // <Grid item xs={3}>
        <Grid container item direction="column" justify="center" alignItems="center" spacing={0} xs>
            <Grid item xs>
                <Typography variant="subtitle2" className={classes.chartLabel}>{props.chartName}</Typography>
            </Grid>
            <Grid item xs className={classes.pieChart}>
                <VictoryPie
                    padAngle={({ datum }) => datum.y}
                    innerRadius={100}
                    colorScale={props.colorScale}
                    data={props.dataSet}
                // labels={({ datum }) => datum.y}
                // style={{ labels: { fill: "white", fontSize: "24px" } }}
                // labelComponent={<VictoryLabel dy={30} />}
                />
            </Grid>
            <Grid item xs>
                <List className={classes.legendList}>
                    {props.dataSet.map((item, index) => {
                        // console.log(props.colorScale);

                        return (<ListItem key={index} className={classes.legendItem}>
                            <div className={classes.legendColor} style={{ background: props.colorScale[index] }}></div> <Typography variant={"body2"}>{item.label}</Typography>
                        </ListItem>);
                    }
                    )}
                </List>
            </Grid>
            {/* </Grid> */}
        </Grid>);
}

DashboardSummry.propTypes = {
    chartName: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    dataSet: PropTypes.arrayOf(PropTypes.object),
    colorScale: PropTypes.arrayOf(PropTypes.object),
}

function DashboardSummry(props) {
    const classes = useStyles();
    const theme = useTheme();
    const defaultColorScale = [theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main];
    const progressColorScale = [theme.palette.roomStatus.clone, theme.palette.roomStatus.veg, theme.palette.roomStatus.flower];

    const [state, setState] = React.useState({
        rooms: ["Green Gardens", "Desert Warhouse", "Hilltop Garden"],
        pick: 0
    });

    const handleChange = (event) => {
        const name = event.target.name;
        console.log(name);
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <Grid container direction="column" spacing={3} className={classes.dashboardSummery}>
            <Grid container item direction="row" xs>
                <Grid item xs={2}>
                    <Typography variant={"h6"}>Summery</Typography>
                </Grid>
                <Grid item xs ></Grid>
                <Grid item xs={2}>
                    <FormControl variant={"filled"} className={classes.formControl}>
                        <InputLabel htmlFor="Room-Name">Room</InputLabel>
                        <Select
                            value={state.pick}
                            onChange={handleChange}
                            inputProps={{
                                name: 'pick',
                                id: 'Room-Name',
                            }}
                            defaultValue={0}
                        >
                            {console.log(state)}
                            {state.rooms.map((Item, Index) => (
                                <MenuItem key={Index} value={Index}>{Item || Item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            
            {/* ========= charts start here =================================*/}
            <Grid container item direction="row" xs >
                <DashboardPieChart chartName={"Temp"} classes={classes} theme={theme} dataSet={sampleTempData} colorScale={defaultColorScale} />
                <DashboardPieChart chartName={"Humidity"} classes={classes} theme={theme} dataSet={sampleHumidityData} colorScale={defaultColorScale} />
                <DashboardPieChart chartName={"CO2"} classes={classes} theme={theme} dataSet={sampleCO2Data} colorScale={defaultColorScale} />
                <DashboardPieChart chartName={"Progress"} classes={classes} theme={theme} dataSet={sampleProgressData} colorScale={progressColorScale} />
            </Grid>
        </Grid>
    )
}

DashboardSummry.propTypes = {

}


export default DashboardSummry


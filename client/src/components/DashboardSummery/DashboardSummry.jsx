import React from 'react'
import PropTypes from 'prop-types'

import { VictoryPie, VictoryLabel } from "victory";
import { Grid, Typography, List,withStyles } from "@material-ui/core"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';
import {StandardRoundSelectForm} from "../StandardSelect/StandardSelect.js";
import {sampleTempData,sampleHumidityData,sampleProgressData,sampleCO2Data} from "../../exampleDataTypes/clientExamlpeDataTypes";
import './style.css';






const useStyles = makeStyles((theme) => ({
    dashboardSummery: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main
    },
    formControl: {
        color: theme.palette.text.main,
        minHeight: "32px",
        maxHeight: "48px"
    },
    chartLabel: {
        // textAlign: 'center',
    },
    pieChart: {
        width: "160px",
        height: "160px"
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
    const labels = [];

    props.dataSet.map((item) => {
        labels.push(item.y);
        return item.y
    })

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
                    labels={({ datum }) => datum.y.toString()}
                    labelPlacement={({ index }) => index
                        ? "parallel"
                        : "vertical"}
                    style={{ labels: { fill: "white", fontSize: "32px" } }}
                    labelComponent={<VictoryLabel />}
                />
            </Grid>
            <Grid item xs>
                <List className={classes.legendList}>
                    {props.dataSet.map((item, index) => {
                        // console.log(props.colorScale);

                        return (<ListItem key={index} className={classes.legendItem}>
                            <div className={classes.legendColor} style={{ background: props.colorScale[index] }}></div> <Typography variant={"body2"}>{item.catName}</Typography>
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
        rooms: ["Room Alpha", "Room beta", "clone Room", "flower one", "flower two", "veg room a"],
        pick: 0
    });

    const handleChange = (event) => {
        const name = event.target.name;
        // console.log(name);
        setState({
            ...state,
            [name]: event.target.value,
        });
        props.setRoom(event.target.value);
    };

    return (
        <Grid container direction="column" justify={"center"} spacing={2} className={classes.dashboardSummery}>
            <Grid container item direction="row" xs>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant={"h6"}>Summery</Typography>
                </Grid>
                <Grid item xs ></Grid>
                <Grid item xs={2}>
                    <StandardRoundSelectForm className={classes.formControl} >
                        
                        <Select
                            value={state.pick}
                            onChange={handleChange}
                            inputProps={{
                                name: 'pick',
                                id: 'Room-Name',
                            }}
                            defaultValue={0}
                        >
                            {state.rooms.map((Item, Index) => (
                                <MenuItem key={Index} value={Index}>{Item || Item.name}</MenuItem>
                            ))}
                        </Select>
                    </StandardRoundSelectForm>
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


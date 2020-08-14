import React from 'react'
import PropTypes from 'prop-types'

import { VictoryPie } from "victory";
import { Grid, Box, Typography, List} from "@material-ui/core"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItem from '@material-ui/core/ListItem';





const sampleTempData = [{ x: 1, y: 1, label: "Fault" },
{ x: 2, y: 2, label: "Warning" },
{ x: 3, y: 5, label: "Nominal" }
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
        opacity: 1,
        height: "320px",
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

    color: {
        background: theme.palette.roomStatus.veg
    },

}));

function DashboardSummry(props) {
    const classes = useStyles();
    const theme = useTheme();

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
            <Grid container item direction="row" xs >
                <Grid item xs={3}>
                    <Grid container item direction="column" justify="center" alignItems="center" xs>
                        <Grid item xs>
                            <Typography variant="subtitle2" className={classes.chartLabel}>Temprature</Typography>
                        </Grid>
                        <Grid item xs className={classes.pieChart}>
                            <VictoryPie
                                padAngle={({ datum }) => datum.y}
                                innerRadius={100}
                                colorScale={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main]}
                                data={sampleTempData} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} >
                <Grid container item direction="column" justify="center" alignItems="center" xs>
                        <Grid item xs>
                            <Typography variant="subtitle2" className={classes.chartLabel}>Humidity</Typography>
                        </Grid>
                        <Grid item xs className={classes.pieChart}>
                            <VictoryPie
                                padAngle={({ datum }) => datum.y}
                                innerRadius={100}
                                colorScale={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main]}
                                data={sampleTempData} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} >
                <Grid container item direction="column" justify="center" alignItems="center" xs>
                        <Grid item xs>
                            <Typography variant="subtitle2" className={classes.chartLabel}>CO2</Typography>
                        </Grid>
                        <Grid item xs className={classes.pieChart}>
                            <VictoryPie
                                padAngle={({ datum }) => datum.y}
                                innerRadius={100}
                                colorScale={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main]}
                                data={sampleTempData} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} >
                <Grid container item direction="column" justify="center" alignItems="center" xs>
                        <Grid item xs>
                            <Typography variant="subtitle2" className={classes.chartLabel}>Progress</Typography>
                        </Grid>
                        <Grid item xs className={classes.pieChart}>
                            <VictoryPie
                                padAngle={({ datum }) => datum.y}
                                innerRadius={100}
                                colorScale={[theme.palette.roomStatus.fault, theme.palette.roomStatus.warning, theme.palette.primary.main]}
                                data={sampleTempData} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

DashboardSummry.propTypes = {

}

export default DashboardSummry


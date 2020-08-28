import React, { useState, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid, FormControl, InputLabel, Select, MenuItem, makeStyles, useTheme, withStyles, Slider, Typography, Button, Divider, IconButton, Box } from '@material-ui/core'
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';



const exampleLightZoneArray = [
    {
        name: "zone one",
        active: true,
        activeCount: 6,
        fault: 0,
        intensity: 50,
        red: 50,
        yellow: 50,
        green: 50,
    },
    {
        name: "zone two",
        active: true,
        activeCount: 6,
        fault: 0,
        intensity: 50,
        red: 50,
        yellow: 50,
        green: 50,
    },
    {
        name: "zone three",
        active: true,
        activeCount: 6,
        fault: 0,
        intensity: 50,
        red: 50,
        yellow: 50,
        green: 50,
    },
    {
        name: "zone four",
        active: true,
        activeCount: 6,
        fault: 0,
        intensity: 50,
        red: 50,
        yellow: 50,
        green: 50,
    },
    {
        name: "zone five",
        active: true,
        activeCount: 6,
        fault: 0,
        intensity: 50,
        red: 50,
        yellow: 50,
        green: 50,
    },
    {
        name: "zone six",
        active: true,
        activeCount: 6,
        fault: 0,
        intensity: 50,
        red: 50,
        yellow: 50,
        green: 50,
    },
]


function valuetext(value) {
    return `${value}%`;
}

const marks = [
    {
        value: 0,
        label: '0%',
    },
    // {
    //     value: 10,
    //     label: '10%',
    // },
    {
        value: 20,
        label: '20%',
    },
    // {
    //     value: 30,
    //     label: '30%',
    // },
    {
        value: 40,
        label: '40%',
    },
    // {
    //     value: 50,
    //     label: '50%',
    // },
    {
        value: 60,
        label: '60%',
    },
    // {
    //     value: 70,
    //     label: '70%',
    // },
    {
        value: 80,
        label: '80%',
    },
    // {
    //     value: 90,
    //     label: '90%',
    // },
    {
        value: 100,
        label: '100%',
    },
];


//calc(-50% + 4px)

const PowerIntensitySlider = withStyles({
    root: {
        color: '#52af77',
    },
    thumb: {
        height: 36,
        width: 36,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: '48px',
    },
    track: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    vertical: {
        minHeight: "128px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(white, black)',
        },
        "& .MuiSlider-rail": {
            width: 25,
            background: 'linear-gradient(white, black)',
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        }
    }
})(Slider);

const RedIntensitySlider = withStyles({
    root: {
        color: '#52af77',
    },
    thumb: {
        height: 36,
        width: 36,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: '48px',
    },
    track: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    vertical: {
        minHeight: "128px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(red, black)',
        },
        "& .MuiSlider-rail": {
            width: 25,
            background: 'linear-gradient(red, black)',
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        }
    }
})(Slider);
const YellowIntensitySlider = withStyles({
    root: {
        color: '#52af77',
    },
    thumb: {
        height: 36,
        width: 36,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: '48px',
    },
    track: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    vertical: {
        minHeight: "128px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(yellow, black)',
        },
        "& .MuiSlider-rail": {
            width: 25,
            background: 'linear-gradient(yellow, black)',
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        }
    }
})(Slider);
const GreenIntensitySlider = withStyles({
    root: {
        color: '#52af77',
    },
    thumb: {
        height: 36,
        width: 36,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: '48px',
    },
    track: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        width: 12,
        borderRadius: 4,
    },
    vertical: {
        minHeight: "128px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(green, black)',
        },
        "& .MuiSlider-rail": {
            width: 25,
            background: 'linear-gradient(green, black)',
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        }
    }
})(Slider);


const ZoneIconButton = withStyles({
    root: {
        borderRadius: "30%",
        position: "absolute",
        top: "-4px",
        left: "-4px",
    },

})(IconButton);


const useStyles = makeStyles((theme) => ({
    roomSummeryWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "256px",
        minHeight: "360px",
    },
    iconButton: {
        color: "white",
    },
    meterContainer: {
        // background:theme.palette.roomStatus.warning,
        minWidth: "128px",
        maxWidth: "256px",
        maxHeight: "256px",
        position: "relative",
    },
    sliderBackround: {
        background: theme.palette.secondary.dark,
        minWidth: "64px",
        maxWidth: "192px",
        minHeight: "128px",
        padding: "12px",
        marginRight: "48px",
        borderRadius: "4px"
    },
    SliderBottomLabel: {
        background: theme.palette.secondary.dark,
        minWidth: "128px",
        minHeight: "48px",
        borderRadius: "24px",
        marginTop: "24px"
    },
    topCaption: {
        height: "24px",
        marginTop: "8px"
    },
    lightZoneWidget: {
        background: theme.palette.secondary.dark,
        color: theme.palette.text.main,
        minWidth: "256px",
        maxWidth: "320px",
        maxHeight: "348px",
    },
    lightZoneButtonBox: {
        border: "solid white 2px",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        position: "relative",
    }

}));



const PowerIntensity = (props) => {
    const classes = useStyles();
    const defaultValue = props.intensity || 50;
    const [value, setValue] = React.useState(defaultValue);

    const topCaption = props.topCaption || "power";
    const type = props.type || 0;
    const bottomHeading = props.bottomHeading || "Intensity";
    const color = props.color || "white";

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };

    const ThumbComponent = (props) => {
        return (
            <span {...props}>
                {value}
            </span>
        );
    }

    const typeOptions = [
        <PowerIntensitySlider
            orientation="vertical"
            defaultValue={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={marks}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />,
        <RedIntensitySlider
            orientation="vertical"
            defaultValue={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={marks}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />,
        <YellowIntensitySlider
            orientation="vertical"
            defaultValue={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={marks}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />,
        <GreenIntensitySlider
            orientation="vertical"
            defaultValue={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={marks}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />
    ]

    return (
        <Grid item container direction={"column"} xs>
            <Grid item className={classes.topCaption}>
                <Typography variant={"caption"} >{topCaption}</Typography>
            </Grid>
            <Grid item container className={classes.sliderBackround} direction={"row"} align={"center"}>
                <Grid item style={{ minHeight: "192px", marginTop: "24px" }}>
                    <div style={{ minHeight: "192px" }}>
                        {typeOptions[type]}
                    </div>
                </Grid>
            </Grid>
            <Grid item container direction={"row"} justify={"center"}>
                <Grid item className={classes.SliderBottomLabel}>

                    <Button style={{ color: color }}><Typography variant={"button"} align={"right"} >set {bottomHeading}</Typography></Button>
                </Grid>
            </Grid>

        </Grid>
    );
}

const RGBInensities = (props) => {
    return (
        <Grid item container direction={"row"} xs={5}>
            <PowerIntensity type={1} topCaption={"Color Spectrum"} bottomHeading={"Red"} color={"red"} />
            <Divider orientation={"vertical"} flexItem></Divider>
            <PowerIntensity type={2} topCaption={" "} bottomHeading={"Yellow"} color={"yellow"} />
            <Divider orientation={"vertical"} flexItem></Divider>
            <PowerIntensity type={3} topCaption={" "} bottomHeading={"Green"} color={"green"} />
        </Grid>
    );
};


export const LightingController = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const lightZoneArray = props.lightZoneArray || exampleLightZoneArray;

    const [state, setState] = useState({
        lightZoneArray: lightZoneArray,
        currentZone: 0,
    });

    const handleChange = (event) => {
        console.log(state.pick)
        const name = event.target.name;
        // console.log(name);
        setState({
            ...state,
            [name]: event.target.value,
        });
        // props.setRoom(event.target.value);
    };

    return (
        <Grid item container direction={"column"} >
            {/* This is the topBar */}
            <Grid item container direction={"row"} spacing={5} style={{ paddingTop: "12px" }}>
                <Grid item xs={1}></Grid>
                <Grid item xs >
                    <Typography variant={"h5"}>{`(${state.lightZoneArray[state.currentZone].activeCount}) Lights Active`}</Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2}>
                    <FormControl variant={"filled"} className={classes.formControl} color={'primary'} focused >
                        <InputLabel htmlFor="Room-Name">zone</InputLabel>
                        <Select
                            value={state.currentZone}
                            onChange={handleChange}
                            inputProps={{
                                name: 'currentZone',
                                id: 'Room-Name',
                            }}
                            defaultValue={0}
                        >
                            {state.lightZoneArray.map((Item, Index) => (
                                <MenuItem key={Index} value={Index}>{Item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs></Grid>
            </Grid>
            {/*this is the main bar  */}
            <Grid item container direction={"row"} spacing={5}>
                <Divider orientation={"vertical"} variant={"middle"} flexItem></Divider>
                <PowerIntensity />
                <RGBInensities />
                <Grid container item xs={4} direction={"column"} className={classes.lightZoneWidget}>
                    {state.lightZoneArray.map((item, index) => {
                        let color= "black";
                        let textColor="red";
                        let active="inactive";
                        if(item.activeCount===6){
                            color=theme.palette.primary.main;
                            active="active"
                            textColor=theme.palette.roomStatus.veg;
                        }
                        return (
                            <Grid item container direction={"column"} xs={4} spacing={0} key={index} className={classes.LightZoneButtonOuterBox}>
                                <Grid item>
                                    <Typography variant={"subtitle2"}>{item.name}</Typography>
                                </Grid>
                                <Grid item className={classes.lightZoneButtonBox} style={{positon:"relative",background: color,}}>
                                    <ZoneIconButton><EmojiObjectsIcon style={{ fontSize: "36px", color: "white" }} /></ZoneIconButton>
                                </Grid>
                                <Grid item>
                                    <Typography variant={"caption"} align={"right"} style={{color:textColor}}>{active}</Typography>
                                    
                                </Grid>
                            </Grid>
                        );
                    })}
                </Grid>
            <Grid item xs={1}></Grid>
        </Grid>
        </Grid >
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LightingController)

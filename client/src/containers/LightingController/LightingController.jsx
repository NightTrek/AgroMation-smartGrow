import React, { useState, useEffect } from 'react';
import { connect, useSelector, shallowEqual } from "react-redux";
import { compose } from "redux";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'; //
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { Grid, TextField, makeStyles, useTheme, withStyles, Slider, Typography, Button, Divider, IconButton, Backdrop, Modal, Fade, Box } from '@material-ui/core'
//icons
// import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import WavesIcon from '@material-ui/icons/Waves';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CancelIcon from '@material-ui/icons/Cancel';
//my imports 
import { exampleLightZoneArray } from "../../exampleDataTypes/clientExamlpeDataTypes";
import { fetchZones, pendingZones, setExampleZones, resetPendingZones} from "../../actions/LightZoneActions";


function valuetext(value) {
    return `${value}%`;
}

//calc(-50% + 4px)

const PowerIntensitySlider = withStyles({
    root: {
        color: '#52af77',
    },
    thumb: {
        height: 48,
        width: 56,
        backgroundColor: '#fff',
        border: '2px solid black',
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
        minHeight: "192px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(white, black)',
            borderRadius: " 0 0 24px 24px",
        },
        "& .MuiSlider-rail": {
            width: 30,
            background: 'linear-gradient(white, black)',
            borderRadius: "24px",
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        },
        "& .MuiSlider-thumb": {
            // marginTop: -320,
            marginLeft: -12,
            border: '2px solid #2D2F33',
            color:"black"
        }
    }
})(Slider);

const RedIntensitySlider = withStyles({
    root: {
        color: '#52af77',
    },
    thumb: {
        height: 48,
        width: 56,
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
        minHeight: "192px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(red, black)',
            borderRadius: " 0 0 24px 24px",
        },
        "& .MuiSlider-rail": {
            width: 30,
            background: 'linear-gradient(red, black)',
            borderRadius: "24px",
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        },
        "& .MuiSlider-thumb": {
            marginTop: -320,
            marginLeft: -12,
            border: '2px solid #2D2F33',
            color:"black"
        }
    }
})(Slider);
const YellowIntensitySlider = withStyles({
    root: {
        color: '#52af77',
    },
    thumb: {
        height: 48,
        width: 56,
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
        minHeight: "192px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(yellow, black)',
            borderRadius: " 0 0 24px 24px",
        },
        "& .MuiSlider-rail": {
            width: 30,
            background: 'linear-gradient(yellow, black)',
            borderRadius: "24px",
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        },
        "& .MuiSlider-thumb": {
            marginTop: -320,
            marginLeft: -12,
            border: '2px solid #2D2F33',
            color:"black"
        }
    }
})(Slider);
const BlueIntensitySlider = withStyles({
    root: {
        color: '#52af77',

    },
    thumb: {
        height: 48,
        width: 56,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        // marginTop: -8,
        // marginLeft: -32,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: '48px',
    },
    vertical: {
        minHeight: "192px",
        "& .MuiSlider-track": {
            width: 32,
            background: 'linear-gradient(blue, black)',
            borderRadius: " 0 0 24px 24px",
        },
        "& .MuiSlider-rail": {
            width: 30,
            background: 'linear-gradient(blue, black)',
            borderRadius: "24px",
        },
        "& .MuiSlider-markLabel": {
            left: '64px',
            color: "white",
        },
        "& .MuiSlider-thumb": {
            marginTop: -320,
            marginLeft: -12,
            border: '2px solid #2D2F33',
            color:"black"
        }

    }
})(Slider);



const ZoneSearchInput = withStyles((theme) => ({

    root: {
        background: theme.palette.secondary.dark,
        color:theme.palette.text.main
    },

}))(TextField);


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
    sliderBackground: {
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
        marginTop: "8px",
        marginLeft: "8px"
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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: "absolute",
        minWidth: "512px",
        color: theme.palette.text.main,
        backgroundColor: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.secondary.dark}`,
        boxShadow: theme.shadows[5],
        padding: "12px",
    },
    sliderRow: {
        marginTop: "32px",
        marginBottom: "32px",
        padding: "48px",
        background: theme.palette.secondary.dark,
        borderRadius: "12px",
        // border:`solid 2px ${theme.palette.secondary.dark}`
    },

}));



const PowerIntensity = (props) => {
    const classes = useStyles();
    const defaultValue = props.intensity || 50;
    const [value, setValue] = React.useState(defaultValue);

    const topCaption = props.topCaption || "power";
    const type = props.type || 0;
    // const bottomHeading = props.bottomHeading || "Intensity";
    // const color = props.color || "white";

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
            marks={false}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />,
        <RedIntensitySlider
            orientation="vertical"
            defaultValue={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={false}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />,
        <YellowIntensitySlider
            orientation="vertical"
            defaultValue={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={false}
            ThumbComponent={ThumbComponent}
            onChange={handleSliderChange}
        />,
        <BlueIntensitySlider
            orientation="vertical"
            defaultValue={defaultValue}
            aria-labelledby="vertical-slider"
            getAriaValueText={valuetext}
            marks={false}
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
                <Grid item style={{ minHeight: "192px", marginTop: "24px", marginLeft: "24px", }}>
                    <div style={{ minHeight: "192px" }}>
                        {typeOptions[type]}
                    </div>
                </Grid>
            </Grid>
            {/* <Grid item container direction={"row"} justify={"center"}>
                <Grid item className={classes.SliderBottomLabel}>

                    <Button style={{ color: color }}><Typography variant={"button"} align={"center"} >set {bottomHeading}</Typography></Button>
                </Grid>
            </Grid> */}

        </Grid>
    );
}

const RGBInensities = (props) => {
    // const { red, yellow, blue } = props;
    return (
        <Grid item container direction={"row"} xs={5} wrap={'nowrap'} style={{ marginLeft: "48px", marginBottom: "24px" }}>
            <PowerIntensity type={1} topCaption={"Color Spectrum"} bottomHeading={"Red"} color={"red"} />
            <Divider orientation={"vertical"} flexItem></Divider>
            <PowerIntensity type={2} topCaption={" "} bottomHeading={"Yellow"} color={"yellow"} />
            <Divider orientation={"vertical"} flexItem></Divider>
            <PowerIntensity type={3} topCaption={" "} bottomHeading={"Blue"} color={"blue"} />
        </Grid>
    );
};


const activeIndicator = (props) => {
    const active = props.value;
    // const { nominal, fault } = props;

    const mainStyle = {
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        margin: "8px"
    }

    switch (active) {
        case true:
            return (<div style={{ ...mainStyle, background: "#31B461" }}></div>);
        default:
            return (<div style={{ ...mainStyle, background: "#121315" }}></div>)
    }
};





const LightingController = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const lightZoneArray = props.lightZoneArray || exampleLightZoneArray;

    let { rooms, pick, user, lightZones, pending } = useSelector(state => ({
        rooms: state.growRooms.rooms,
        pick: state.growRooms.roomIndex,
        user: state.users.user,
        lightZones: state.LightZones.zoneArray,
        pending: state.LightZones.pendingZones

    }), shallowEqual)

    useEffect(() => {
        // console.log(pending !== true && user !== undefined && rooms[0].ownerID === undefined)
        // console.log(user)
        if (pending !== true && user !== undefined && rooms[pick] !== undefined) {
            if(user.example){
                props.setExampleZones()
            }else if(user.UID !== undefined  && rooms[pick].Zones !== undefined){
                console.log("fetching zones from db")
                props.fetchZones(rooms[pick])
                props.pendingZones()
            }
        }
    })
    

    if (rooms === undefined || rooms.length === 0) {
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
    // console.log(lightZones.length)
    //check if zones are undefined and put loading data
    
    if(lightZones.length === 0){
        if(rooms.Zones === undefined){
            lightZones = [
                {
                    id: 1,
                    example:true,
                    name: "No Zones set up in this room",
                    active: false,
                    activeCount: 0,
                    fault: 0,
                    intensity: 50,
                    red: 50,
                    yellow: 50,
                    blue: 50,
                    timeOn:"NaN",
                    timeOff:"NaN",
                    dateFirstStarted:0,
                    totalRuntime:0
                },
            ]
        }
        else{
            lightZones = [
                {
                    id: 1,
                    example:true,
                    name: "Loading Zones",
                    active: false,
                    activeCount: 6,
                    fault: 0,
                    intensity: 50,
                    red: 50,
                    yellow: 50,
                    blue: 50,
                    timeOn:"1111",
                    timeOff:"1111",
                    dateFirstStarted:0,
                    totalRuntime:0
                },
            ]
        }
        
    }
    
    

    const [state, setState] = useState({
        lightZoneArray: lightZoneArray,
        currentZone: 0,
        selectedZones: [],
        spectrumModal: false,
        powerModal: false,
        scheduleModal: false,

    });

    ///Grid stuff
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);


    function onGridReady(params) {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    }

    

    const handleChange = (event) => {
        gridApi.setFilterModel({
            name: {
                filterType: "string",
                type: 'startsWith',
                filter: event.target.value
            }
        });
        var filterState = gridApi.getFilterModel();
        console.log('filterState: ', filterState);
        // props.setRoom(event.target.value);
        gridApi.onFilterChanged();
    };

    const openSpectrumControl = (event) => {

        let selectedRows = gridApi.getSelectedRows()
        console.log(selectedRows)
        if (selectedRows !== undefined && selectedRows.length > 0) {
            setState({
                ...state,
                spectrumModal: true,
                selectedZones: selectedRows
            })
        }
        else {
            // TODO nothing selected warning
            console.log("provide warning that nothing is selected");
        }

    };

    const openPowerControl = (event) => {

        let selectedRows = gridApi.getSelectedRows()
        console.log(selectedRows)
        if (selectedRows !== undefined && selectedRows.length > 0) {
            setState({
                ...state,
                powerModal: true,
                selectedZones: selectedRows
            })
        }
        else {
            // TODO nothing selected warning
            console.log("provide warning that nothing is selected");
        }

    };

    const openScheduleControl = (event) => {

        let selectedRows = gridApi.getSelectedRows()
        console.log(selectedRows)
        if (selectedRows !== undefined && selectedRows.length > 0) {
            setState({
                ...state,
                scheduleModal: true,
                selectedZones: selectedRows
            })
        }
        else {
            // TODO nothing selected warning
            console.log("provide warning that nothing is selected");
        }

    };

    const handleClose = () => {
        setState({
            ...state,
            spectrumModal: false,
            powerModal: false,
            scheduleModal: false,
        })
    }

    const numberOfActiveZones = () => {
        let count = 0;
        if(lightZones.length >0){
            lightZones.forEach((item) =>{
                if(item.active){
                    count++
                }
            })
            return count;
        }
        else{return 0}
        
    }

    return (
        <Grid item container direction={"column"} >
            {/* This is the topBar */}
            <Grid item container direction={"row"} spacing={5} style={{ paddingTop: "12px" }}>
                <Grid item xs style={{ marginLeft: "24px" }}>
                    <Typography variant={"h5"}>{`(${numberOfActiveZones()}) Light Zones Active`}</Typography>
                </Grid>
                <Grid item xs></Grid>
                <Grid item><IconButton onClick={openSpectrumControl}><WavesIcon color={"primary"} /></IconButton></Grid>
                <Grid item><IconButton onClick={openPowerControl}><WbIncandescentIcon color={"primary"} /></IconButton></Grid>
                <Grid item><IconButton onClick={openScheduleControl}><ScheduleIcon color={"primary"} /></IconButton></Grid>
                <Grid item >
                    <ZoneSearchInput id="filled-search" label="Search field" type="search" variant="filled" onChange={handleChange} />
                </Grid>
            </Grid>
            {/*this is the main bar  */}
            <Grid item container direction={'row'} style={{ marginLeft: "24px", marginTop: "24px" }}>
                <div className="ag-theme-alpine-dark" style={{ minHeight: '300px', minWidth: '200px', width: "98%" }}>
                    <AgGridReact
                        rowData={lightZones}
                        rowSelection="multiple"
                        rowMultiSelectWithClick={true}
                        animateRows={true}
                        defaultColDef={{
                            flex: 1,
                            minWidth: 150,
                            sortable: true,
                            filter: true,
                        }}
                        onGridReady={onGridReady}
                        frameworkComponents={{
                            activeRenderer: activeIndicator,
                        }}
                    >

                        <AgGridColumn field="name" sortable={true} filter={true} checkboxSelection={true}></AgGridColumn>
                        <AgGridColumn field="active" sortable={true} cellRenderer={"activeRenderer"}></AgGridColumn>
                        <AgGridColumn field="timeOn" sortable={true}></AgGridColumn>
                        <AgGridColumn field="timeOff" sortable={true}></AgGridColumn>
                        <AgGridColumn field="totalRuntime" sortable={true}></AgGridColumn>
                    </AgGridReact>
                </div>
            </Grid>
            {/* spectrum modal */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={state.spectrumModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={state.spectrumModal}>
                    <Box className={classes.paper}>
                        <Grid item container direction={"column"} className={classes.setPointWidget}>
                            <Grid item container direction={"row"}>
                                <Grid item> <Typography variant={"h5"}>Light Spectrum Control</Typography></Grid>
                                <Grid item xs> </Grid>
                                <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                            </Grid>
                            <Grid item container direction={'row'}>
                                <div className="ag-theme-balham-dark" style={{ width: "90%", height: "128px", marginLeft: "24px" }}>
                                    <AgGridReact
                                        rowData={state.selectedZones}
                                        defaultColDef={{
                                            flex: 1,
                                            minWidth: 48,
                                        }}>
                                        <AgGridColumn field="name"></AgGridColumn>
                                        <AgGridColumn field="red" ></AgGridColumn>
                                        <AgGridColumn field="yellow" ></AgGridColumn>
                                        <AgGridColumn field="blue" ></AgGridColumn>
                                    </AgGridReact>
                                </div>
                            </Grid>
                            <Grid item container direction={"row"}>
                                <RGBInensities />
                            </Grid>
                            <Grid item container direction={"row"}>
                                <Button variant={"outlined"} color={"primary"}>
                                    Set
                                    </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
            {/* power  */}
            <Modal
                aria-labelledby="transition-modal-Power"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={state.powerModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={state.powerModal}>
                    <Box className={classes.paper}>
                        <Grid item container direction={"column"} className={classes.setPointWidget}>
                            <Grid item container direction={"row"}>
                                <Grid item> <Typography variant={"h5"}>Light Intensity Control</Typography></Grid>
                                <Grid item xs> </Grid>
                                <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                            </Grid>
                            {/* <Grid item container direction={'row'}>
                                
                            </Grid> */}
                            <Grid item container direction={"row"}>
                                <Box style={{ marginLeft: "48px", marginBottom: "24px" }}>
                                    <PowerIntensity />
                                </Box>
                                <div className="ag-theme-balham-dark" style={{ width: "50%", height: "256px", marginLeft: "48px", marginTop:"28px" }}>
                                    <AgGridReact
                                        rowData={state.selectedZones}
                                        defaultColDef={{
                                            flex: 1,
                                            minWidth: 48,
                                        }}>
                                        <AgGridColumn field="name"></AgGridColumn>
                                        <AgGridColumn field="intensity" ></AgGridColumn>
                                    </AgGridReact>
                                </div>
                            </Grid>
                            <Grid item container direction={"row"}>
                                <Button variant={"outlined"} color={"primary"}>
                                    Set
                                    </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
            {/* Time Scheduler */}
            <Modal
                aria-labelledby="transition-modal-scheduler"
                aria-describedby="transition-modal-scheduler"
                className={classes.modal}
                open={state.scheduleModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={state.scheduleModal}>
                    <Box className={classes.paper}>
                    <Grid item container direction={"column"} className={classes.setPointWidget}>
                            <Grid item container direction={"row"}>
                                <Grid item> <Typography variant={"h5"}>Light Schedule Control</Typography></Grid>
                                <Grid item xs> </Grid>
                                <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                            </Grid>
                            <Grid item container direction={'row'}>
                                <div className="ag-theme-balham-dark" style={{ width: "90%", height: "128px", marginLeft: "24px" }}>
                                    <AgGridReact
                                        rowData={state.selectedZones}
                                        defaultColDef={{
                                            flex: 1,
                                            minWidth: 48,
                                        }}>
                                        <AgGridColumn field="name"></AgGridColumn>
                                        <AgGridColumn field="timeOn" ></AgGridColumn>
                                        <AgGridColumn field="timeOff" ></AgGridColumn>
                                        <AgGridColumn field="totalRuntime" ></AgGridColumn>
                                    </AgGridReact>
                                </div>
                            </Grid>
                            <Grid item container direction={"row"}>
                            <Grid item container direction={"column"} className={classes.sliderRow}>
                                    <Grid item container direction={"row"} style={{ padding: "6px", marginBottom: "24px" }}>
                                        <Grid item> <h4>Schedule Lighting times</h4></Grid>
                                        <Grid item xs> </Grid>
                                    </Grid>
                                    <Grid item container direction={"row"} style={{ padding: "6px", marginBottom: "24px" }}>
                                        <Grid item></Grid>
                                        <Grid item xs> </Grid>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                            <Grid item container direction={"row"}>
                                <Button variant={"outlined"} color={"primary"}>
                                    Set
                                    </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </Grid >
    )
}


function mapStateToProps({ state }) {
    return { state };
}

const formedComponent = compose(
    connect(mapStateToProps, {fetchZones:fetchZones, pendingZones:pendingZones, resetPendingZones:resetPendingZones, setExampleZones:setExampleZones})
)(LightingController);

export default formedComponent;
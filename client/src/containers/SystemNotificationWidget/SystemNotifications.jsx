import React from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import requireAuth from '../../hoc/requireAuth';
import { Grid, Typography, ListItem, List, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles, } from '@material-ui/core/styles'; //useTheme
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
// import FixedSizeList  from 'react-window/src/FixedSizeList';
import { addGrowRoom, fetchUserGrowRoomsAndStatus } from "../../actions";

const useStyles = makeStyles((theme) => ({
    notificationsWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "256px",
        maxWidth: "632px",
        height: "360px",
        marginTop: "12px",
    },
    iconButton: {
        color: "white",
    },
    warning: {
        // background:theme.palette.roomStatus.warning,
        color: theme.palette.roomStatus.warning
    },
    warningText: {
        background: theme.palette.roomStatus.warning,
        borderRadius: "12px",
        padding: "2px",
        marginLeft: "8px",
        marginRight:"8px",
        paddingLeft: "8px",
        paddingRight: "8px",
    },
    fault: {
        // background:theme.palette.roomStatus.fault,
        color: theme.palette.roomStatus.fault
    },
    faultText: {
        background: theme.palette.roomStatus.fault,
        borderRadius: "12px",
        padding: "2px",
        paddingLeft: "8px",
        paddingRight: "8px",
        marginLeft: "8px",
        marginRight:"8px"
    },
    info: {
        // background:theme.palette.secondary.main,
        color: theme.palette.secondary.main
    },
    infoText: {
        background: theme.palette.secondary.main,
        borderRadius: "12px",
        padding: "2px",
        marginLeft: "8px",
        marginRight:"8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        // color: theme.palette.secondary.main
    },

}));

const sampleNotifications = [{
    type: "FAULT",
    room: "Room Alpha",
    msg: "Controller offline",
    timeStamp: "1597477764"
}, {
    type: "warning",
    room: "Room Beta",
    msg: "Temprature warning",
    timeStamp: "1597477764"
}, {
    type: "warning",
    room: "Clone Room",
    msg: "Temprature Warning",
    timeStamp: "1597477764"
}, {
    type: "warning",
    room: "Room Beta",
    msg: "Humidity Warning",
    timeStamp: "1597477764"
}, {
    type: "info",
    room: "Veg room Alpha",
    msg: "only 7 days left",
    timeStamp: "1597477764"
}, {
    type: "info",
    room: "Room Alpha",
    msg: "Temprature out of range",
    timeStamp: "1597477764"
}]

const NotificationsListItems = (props, style) => {
    const [state,] = React.useState({ //setState
        notifications: sampleNotifications,
        pick: 0
    });
    const classes = useStyles();
    return (
        state.notifications.map((item, index) => {
            const itemTime = moment.unix(item.timeStamp);
            console.log(item);
            if (index > 3) {
                return <div key={index}></div>
            }
            switch (item.type) {
                case "warning":
                    return (
                        <ListItem button alignItems="flex-start" style={style} className={"warning"} key={index}>
                            <ListItemIcon ><ErrorRoundedIcon className={classes.warning} /></ListItemIcon><ListItemText >{item.room + ": "}</ListItemText><ListItemText className={classes.warningText}> {item.msg + " "}</ListItemText><ListItemText >{itemTime.format('HH:mm, MM:DD:YYYY')}</ListItemText>
                        </ListItem>
                    )
                case "FAULT":
                    return (
                        <ListItem button alignItems="flex-start" style={style} className={"fault"} key={index}>
                            <ListItemIcon ><BrokenImageIcon className={classes.fault} /></ListItemIcon><ListItemText >{item.room + ": "}</ListItemText><ListItemText className={classes.faultText}>{item.msg + " "}</ListItemText><ListItemText >{itemTime.format('HH:mm, MM:DD:YYYY')}</ListItemText>
                        </ListItem>
                    )
                default:
                    return (
                        <ListItem button alignItems="flex-start" style={style} className={"info"} key={index}>
                            <ListItemIcon ><InfoIcon className={classes.info} /></ListItemIcon><ListItemText >{item.room + ": "}</ListItemText><ListItemText className={classes.infoText}>{item.room + ": " + item.msg + " "}</ListItemText><ListItemText >{itemTime.format('HH:mm, MM:DD:YYYY')}</ListItemText>
                        </ListItem>
                    )

            }
        }))
}
const Row = ({ index, style }) => (
    <div style={style}>Row {index}</div>
);

export const SystemNotifications = () => {
    const classes = useStyles();
    const [state,] = React.useState({ //setState
        notifications: sampleNotifications,
        pick: 0
    });
    return (
        <Grid container item className={classes.notificationsWidget} xs justify={"center"} spacing={1} direction={"column"}>
            <Grid container item xs direction={"row"}>
                <Grid container item xs={8}>
                    <Typography variant={"h5"} style={{ paddingLeft: "12px" }}>System Notifications ({state.notifications.length})</Typography>
                </Grid>
                <Grid container item xs>

                </Grid>
                <Grid container item xs={1}>
                    <IconButton aria-label="Widget Settings" color="primary" className={classes.iconButton}><MoreVertIcon /></IconButton>
                </Grid>
            </Grid>
            <Grid container item xs direction={"row"}>
                <List >
                    {NotificationsListItems()}
                </List>
            </Grid>
            <Grid container item xs justify={"center"}>
                <Button variant="outlined" color="primary">
                    Show {state.notifications.length - 4} more
                </Button>
            </Grid>
        </Grid>
    )
}

function mapStateToProps({ state }) {
    return { state };
}

const formedComponent = compose(connect(mapStateToProps, { addGrowRoom: addGrowRoom, fetchGrowRooms: fetchUserGrowRoomsAndStatus }))(SystemNotifications);

export default requireAuth(formedComponent);

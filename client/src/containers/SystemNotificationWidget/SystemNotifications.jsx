import React from 'react';
import { connect } from 'react-redux';
import { compose } from "redux";
import { Grid, Typography, ListItem, List, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { makeStyles, } from '@material-ui/core/styles'; //useTheme
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
// import FixedSizeList  from 'react-window/src/FixedSizeList';
// import { addGrowRoom, fetchUserGrowRoomsAndStatus } from "../../actions";
import {sampleNotifications} from "../../exampleDataTypes/clientExamlpeDataTypes";


const useStyles = makeStyles((theme) => ({
    notificationsWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,

        minHeight: "360px",
        marginTop: "8px",
        marginBottom:"8px",
        '@media (max-width: 1500px)':{
            minWidth: "512px",
            maxWidth: "832px",
            
        },
        '@media (max-width: 1200px)':{
            minWidth: "448px",
            maxWidth: "640px",
            
        },
        '@media (max-width: 992px)':{
            minWidth: "320px",
            maxWidth: "512px",
            
        },
        '@media (max-width: 705px)':{
            minWidth: "256px",
            maxWidth: "320px",
            
        },
        '@media (max-width: 640px)':{
            minWidth: "320px",
            maxWidth: "512px",
            
        },
        '@media (max-width: 460px)':{
            minWidth:"300px",
            maxWidth: "300px",
            
        },
        '@media (max-width: 400px)':{
            minWidth:"256px",
            maxWidth: "256px",
            
        },
        '@media (max-width: 330px)':{
            minWidth:"212px",
            maxWidth: "212px",
            
        }
    },
    headerText:{
        '@media (max-width: 460px)':{
            fontSize: 14,
            
        },
        '@media (max-width: 400px)':{
            fontSize: 14,
            
        },
        '@media (max-width: 330px)':{
            fontSize: 12,
            
        }
    },
    notificationsList: {
        minWidth: "256px",
        maxWidth: "812px",
        width: "100%",
    },
    iconButton: {
        color: "white",
        height:"48px",
        width:"48px",
        marginRight:"48px"
    },
    listItemIcon:{
        color: theme.palette.text.main,
        '@media (max-width: 460px)':{
            
            
        },
        '@media (max-width: 400px)':{
            marginRight:"-24px"
            
        },
        '@media (max-width: 320px)':{
            fontSize:"medium"
            
        }
    },
    warning: {
        // background:theme.palette.roomStatus.warning,
        background: theme.palette.roomStatus.warning
    },
    warningItem:{
        background: theme.palette.roomStatus.warning,
        borderRadius: "12px",
        // padding: "2px",
        // marginLeft: "8px",
        // marginRight: "8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        marginTop:"4px",
        marginBottom:"4px",
    },
    warningText: {
        background: theme.palette.roomStatus.warning,
        borderRadius: "12px",
        padding: "2px",
        // marginLeft: "8px",
        // marginRight: "8px",
        paddingLeft: "8px",
        // paddingRight: "8px",
        marginTop:"4px",
        marginBottom:"4px",
    },
    fault: {
        // background:theme.palette.roomStatus.fault,
        color: theme.palette.text.main
    },
    faultItem:{
        background: theme.palette.roomStatus.fault,
        borderRadius: "12px",
        // padding: "2px",
        // marginLeft: "8px",
        // marginRight: "8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        marginTop:"4px",
        marginBottom:"4px",
    },
    faultText: {
        background: theme.palette.roomStatus.fault,
        borderRadius: "12px",
        padding: "2px",
        paddingLeft: "8px",
        paddingRight: "8px",
        // marginLeft: "8px",
        // marginRight: "8px"

    },
    info: {
        // background:theme.palette.secondary.main,
        color: theme.palette.secondary.main
    },
    infoItem:{
        background: theme.palette.secondary.main,
        borderRadius: "12px",
        // padding: "2px",
        // marginLeft: "8px",
        // marginRight: "8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        marginTop:"4px",
        marginBottom:"4px",
    },
    infoText: {
        background: theme.palette.secondary.main,
        borderRadius: "12px",
        padding: "2px",
        marginLeft: "8px",
        marginRight: "8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        // color: theme.palette.secondary.main
    },
    globalListItemQueries:{
        '@media (max-width: 705px)':{
            maxWidth:"236px"
            
        },
        '@media (max-width: 640px)':{
            minWidth: "310px",
            maxWidth: "448px",
            
        },
        '@media (max-width: 460px)':{
            minWidth: "224px",
            maxWidth:"256px"
            
        },
        '@media (max-width: 400px)':{
            minWidth: "200px",
            maxWidth:"224px"
            
        },
        '@media (max-width: 330px)':{
            minWidth: "128px",
            maxWidth:"192px"
            
        }
    },
    globalListItemText:{
        "& .MuiTypography-displayBlock":{
            '@media (max-width: 705px)':{
                fontSize: 12,
                
            },
            '@media (max-width: 640px)':{
                fontSize: 14,
                
            },
            '@media (max-width: 460px)':{
                fontSize: 12,
                
            },
            '@media (max-width: 400px)':{
                fontSize: 10,
                
            },
            '@media (max-width: 330px)':{
                fontSize: 8,
                
            }
        }
        
    }

}));



const NotificationsListItems = (props, style) => {
    const [state,] = React.useState({ //setState
        notifications: sampleNotifications,
        pick: 0
    });
    const classes = useStyles();
    return (
        state.notifications.map((item, index) => {
            const itemTime = moment.unix(item.timeStamp);
            if (index > 3) {
                return <div key={index}></div>
            }
            switch (item.type) {
                case "warning":
                    if (props.pick === 0 || props.pick === 2) {
                        return (
                            <ListItem button alignItems="flex-start" style={style} className={`${classes.warningItem} ${classes.globalListItemQueries}`} key={index}>
                                <ListItemIcon className={classes.listItemIcon} ><ErrorRoundedIcon className={classes.listItemIcon} /></ListItemIcon>
                                <ListItemText className={`${classes.globalListItemText}`} >{item.room + ": "}</ListItemText>
                                <ListItemText className={`${classes.globalListItemText} ${classes.warningText}`}> {item.msg + " "}</ListItemText>
                                <ListItemText className={`${classes.globalListItemText}`}>{itemTime.format('HH:mm, MM:DD:YYYY')+ " "}</ListItemText>
                            </ListItem>
                        )
                    }
                    return "";
                case "FAULT":
                    if (props.pick === 1 || props.pick === 2) {
                        return (
                            <ListItem button alignItems="flex-start" style={style} className={`${classes.faultItem} ${classes.globalListItemQueries}`} key={index}>
                                <ListItemIcon className={classes.listItemIcon} ><BrokenImageIcon className={classes.listItemIcon} /></ListItemIcon>
                                <ListItemText className={`${classes.globalListItemText}`}>{item.room + ": "}</ListItemText>
                                <ListItemText className={`${classes.globalListItemText} ${classes.faultText}`}>{item.msg + " "}</ListItemText>
                                <ListItemText className={`${classes.globalListItemText}`}>{itemTime.format('HH:mm, MM:DD:YYYY') + " "}</ListItemText>
                            </ListItem>
                        )
                    }
                    return ""
                default:
                    if (props.pick !== 0 && props.pick !== 1) {
                        return (
                            <ListItem button alignItems="space-evenly" style={style} className={`${classes.infoItem} ${classes.globalListItemQueries}`} key={index}>
                                <ListItemIcon className={classes.listItemIcon} ><InfoIcon className={classes.listItemIcon} /></ListItemIcon>
                                <ListItemText className={`${classes.globalListItemText}`}>{item.room + ": "}</ListItemText>
                                <ListItemText className={`${classes.globalListItemText} ${classes.infoText}`} >{item.room + ": " + item.msg + " "}</ListItemText>
                                <ListItemText className={`${classes.globalListItemText}`}>{itemTime.format('HH:mm, MM:DD:YYYY')+ " "}</ListItemText>
                            </ListItem>
                        )
                    }
                    return "";
            }
        }))
}


export const SystemNotifications = () => {
    const classes = useStyles();
    const [state,setState] = React.useState({ //setState
        notifications: sampleNotifications,
        pick: 2
    });
    const options = [
        'warnings',
        'Fault',
        'All'];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setState({
            ...state,
            pick:event.target.value
        })
        setAnchorEl(null);
    };
    const ITEM_HEIGHT = 48;
//xs={12} sm={6} md
    return (
        <Grid container item className={classes.notificationsWidget} xs justify={"center"} spacing={1} direction={"column"}> 
            <Grid container item xs direction={"row"}>
                <Grid container item xs={8}>
                    <Typography variant={"h5"} className={classes.headerText} style={{ paddingLeft: "12px" }}>System Notifications ({state.notifications.length})</Typography>
                </Grid>
                <Grid container item xs>

                </Grid>
                <Grid container item xs={1}>
                    <IconButton
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        aria-label="Widget Settings" color="primary" className={classes.iconButton}><MoreVertIcon /></IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        value={state.pick}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {options.map((option, index) => (
                            <MenuItem key={option} value={index} selected={option === 'Pyxis'} onClick={handleClose}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
            </Grid>
            <Grid container item xs direction={"row"}>
                <List className={classes.notificationsList}>
                    {<NotificationsListItems pick={state.pick}/>}
                </List>
            </Grid>
            <Grid container item xs justify={"center"}>
                <Button variant="outlined" color="primary" style={{width:"192px",height:"48px"}}>
                    Show {state.notifications.length - 4} more
                </Button>
            </Grid>
        </Grid>
    )
}

function mapStateToProps({ state }) {
    return { state };
}

const formedComponent = compose(connect(mapStateToProps, {  }))(SystemNotifications);

export default formedComponent;

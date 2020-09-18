import React from 'react'
// import PropTypes from 'prop-types'
import {
    Container, Grid, makeStyles, useTheme, withStyles, Button, Modal, Box, Typography, List,
    ListItem, ListItemText, ListItemIcon, Backdrop, Fade, IconButton, Input, Select, MenuItem,
} from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { FixedSizeList } from 'react-window';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';

import CancelIcon from '@material-ui/icons/Cancel';
import { StandardRoundSelectForm } from "../../components/StandardSelect/StandardSelect";



const exampleUsers = [
    {
        id: 1,
        userName: "Daniel Steigman",
        type: "Admin",
        email: "daniel@daniel.com",
        phone:"(661)-228-3212",
        Level: 1,
        zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2", "clone room alpha", "clone room beta", "mother room", "Flower Room A"],
        active: true
    },
    {
        id: 2,
        userName: "Bob lemon",
        type: "Admin",
        email: "Bob@Bob.com",
        phone:"(661)-228-3212",
        Level: 1,
        zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2"],
        active: false
    },
    {
        id: 3,
        userName: "Max torus",
        type: "Admin",
        email: "max@max.com",
        phone:"(661)-228-3212",
        Level: 2,
        zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2"],
        active: true
    },
    {
        id: 4,
        userName: "George Smith",
        type: "Admin",
        email: "george@george.com",
        phone:"(661)-228-3212",
        Level: 1,
        zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2"],
        active: true
    },
    {
        id: 5,
        userName: "Sharon jane",
        type: "Admin",
        email: "Sharon@Sharon.com",
        phone:"(661)-228-3212",
        Level: 1,
        zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2"],
        active: true
    },
]

const EditUserButton = withStyles((theme) => ({

    root: {
        borderRadius: "32px",
        boxShadow: `1px 1px 1px 1px ${theme.palette.secondary.main}`,
        color: "white",
        background: theme.palette.roomStatus.fault,
        '&:hover': {
            background: theme.palette.primary.main,
            border: `solid 1px ${theme.palette.primary.main}`,
            boxShadow: 'none',
            color: "black"
        },
    },

}))(Button);


const EditUserInput = withStyles((theme) => ({

    root: {
        borderRadius: "32px",
        paddingLeft:"12px",
        boxShadow: `1px 1px 1px 1px ${theme.palette.secondary.main}`,
        color: "white",
        background: theme.palette.roomStatus.fault,
    },

}))(Input);

const useStyles = makeStyles((theme) => ({
    usersPageWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        minWidth: "320px",
        minHeight: "512px",
        marginTop: "8px",
        padding: "24x",
    },
    backgroundTab: {
        background: theme.palette.secondary.dark,
    },
    userInfoContainer: {
        background: theme.palette.secondary.dark,
        backgroundImage: ` url("https://cdn.discordapp.com/attachments/370759274621698048/755271571181928459/unknown.png")`,
        minWidth: "412px",
        maxWidth: "412px",

        height: "256px",
        marginLeft: "24px",
        marginBottom: "24px",
        position: "relative",
        borderRadius: "12px",
        boxShadow: "2px 2px 3px 3px " + theme.palette.secondary.dark,
    },
    Profile: {
        background: theme.palette.secondary.main,
        minWidth: "192px",
        maxWidth: "192px",
        minHeight: "100%",
        position: "absolute",
        top: "0px",
        left: "0px",
        borderRadius: "12px",
    },
    zoneList: {
        position: "absolute",
        top: "6px",
        left: "200px"

    },
    accountCircle: {
        padding: "8px",
        borderRadius: "48px",
        background: theme.palette.secondary.dark,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: "12",
    },
    paper: {
        position: "absolute",
        minWidth: "512px",
        color: theme.palette.text.main,
        background:"url('https://cdn.discordapp.com/attachments/370759274621698048/755271239748157540/unknown.png')",
        backgroundPosition:"top left",
        backgroundColor: theme.palette.secondary.main,
        border: `2px solid ${theme.palette.secondary.dark}`,
        boxShadow: theme.shadows[5],
        padding: "12px",
        borderRadius: "12",
    },
    setPointWidget: {
        paddingTop: "0px",
        padding: "24px",
    },
    sliderRow: {
        marginTop: "32px",
        marginBottom: "32px",
        padding: "24px",
        background: theme.palette.secondary.dark,
        borderRadius: "12px",
        // border:`solid 2px ${theme.palette.secondary.dark}`
    },
    input: {
        background: theme.palette.secondary.main,
    }


}));







const UserWidget = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const zones = props.zones;

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //Account Type
    const [state, setState] = React.useState({ //setState
        accountType: ["Admin", "User", "viewer"],
        pick: 0
    });
    const handleChange = (event) => {
        const name = event.target.name;
        // console.log(name);
        setState({
            ...state,
            [name]: event.target.value,
        });
        // props.setRoom(event.target.value);
    };


    const Row = ({ index, style }) => (
        <div style={style}><ListItemIcon><CheckCircleRoundedIcon style={{ color: theme.palette.primary.main, fontSize: "18px" }} /></ListItemIcon>{zones[index]}</div>
    );
    return (
        <Grid item container direction={"row"} className={classes.userInfoContainer} xs>
            <Grid item container xs className={classes.Profile} direction={"column"} alignItems={"center"}>
                <Grid item xs></Grid>
                <Grid item xs > <Typography variant={"h6"} >{props.userName}</Typography></Grid>
                <Grid item xs ><Box className={classes.accountCircle}><AccountCircleRoundedIcon style={{ fontSize: "64px", color: theme.palette.primary.main }} /></Box></Grid>
                <Grid item xs></Grid>
                <Grid item xs>{props.type}</Grid>
                <Grid item xs><Typography variant={"body2"} style={{ color: theme.palette.roomStatus.veg }}>{props.email}</Typography></Grid>
            </Grid>
            <Grid item xs >
                <List className={classes.zoneList}>
                    <ListItem>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary={"Zones"}></ListItemText>
                    </ListItem>
                    <ListItem >
                        <FixedSizeList height={128} width={192} itemSize={32} itemCount={zones.length}>
                            {Row}
                        </FixedSizeList>
                    </ListItem>
                    <ListItem>
                        <EditUserButton variant={"contained"} onClick={handleOpen}>Edit user</EditUserButton>
                    </ListItem>
                </List>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className={classes.paper}>
                        <form noValidate >
                            <Grid item container direction={"column"} className={classes.setPointWidget}>
                                <Grid item container direction={"row"}>
                                    <Grid item xs> <Grid item ><h3 id="transition-modal-title">Edit User</h3></Grid></Grid>
                                    <Grid item> <IconButton onClick={handleClose} ><CancelIcon style={{ color: theme.palette.text.main }} /></IconButton></Grid>
                                </Grid>
                                <Grid item container direction={"row"} spacing={5}>
                                    <Grid item xs={12} sm={6}>

                                        <EditUserInput defaultValue={props.userName} inputProps={{ 'aria-label': 'description' }} />


                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <StandardRoundSelectForm className={classes.formControl} hiddenLabel>
                                            <Select
                                                value={state.pick}
                                                onChange={handleChange}
                                                inputProps={{
                                                    name: 'pick',
                                                    id: 'AccountType',
                                                }}
                                                defaultValue={0}
                                            >
                                                {state.accountType.map((Item, Index) => (
                                                    <MenuItem key={Index} value={Index}>{Item}</MenuItem>
                                                ))}
                                            </Select>
                                        </StandardRoundSelectForm>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <EditUserInput defaultValue={props.email} inputProps={{ 'aria-label': 'description' }} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <EditUserInput defaultValue={props.phone} inputProps={{ 'aria-label': 'description' }} />
                                    </Grid>

                                </Grid>
                                <Grid item container direction={"column"} className={classes.sliderRow}>
                                    <Grid item container direction={"row"} style={{ padding: "6px", marginBottom: "24px" }}>
                                        <Grid item> <h4>Security</h4></Grid>
                                        <Grid item xs> </Grid>
                                    </Grid>
                                    <Grid item container direction={'row'}>

                                        <Grid item xs>
                                            <EditUserInput label={"Generated password"} defaultValue={"*********************"} inputProps={{ 'aria-label': 'description' }} />
                                        </Grid>
                                        <Grid item xs>
                                            <EditUserButton color={"primary"}>
                                                Generate new Password
                                        </EditUserButton>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid item container direction={"row"}>
                                    <Grid item xs></Grid>
                                    <Grid item xs>
                                        <Button variant={"outlined"} color={"primary"}>
                                            SAVE USER DETAILS
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </Grid>
    );
}

export default function UsersPage(props) {
    const classes = useStyles();

    const [state, ] = React.useState({ //setState
        Users: props.Users || exampleUsers,
        pick: 1,
    });

    return (
        <Container className={"containerMain"}>
            <Grid container item direction={"column"} spacing={5} className={classes.usersPageWidget} alignItems={"center"}>
                <Grid item container direction={'row'} style={{ paddingRight: "24px" }}>
                    <Grid item xs>
                        <Typography variant={"h4"}>Manage Users</Typography>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
                <Grid item container direction={"row"} spacing={5} style={{ marginLeft: "48px" }} justify={"flex-start"}>
                    {state.Users.map((item, index) => {
                        return (
                            <UserWidget key={index} UserIndex={index} userName={item.userName} email={item.email} type={item.type} phone={item.phone} zones={state.Users[index].zones} />
                        );
                    })}
                </Grid>
            </Grid>
        </Container>
    )
}

import React from 'react'
// import PropTypes from 'prop-types'
import { Container, Grid, makeStyles, useTheme, withStyles, Button, Tabs, Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { FixedSizeList } from 'react-window';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import requireAuth from '../../hoc/requireAuth';

const exampleUsers = [
    {
        id: 1,
        userName: "Daniel Steigman",
        type: "Admin",
        email: "daniel@daniel.com",
        Level: 1,
        zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2","clone room alpha", "clone room beta", "mother room", "Flower Room A"],
        active: true
    },
    {
        id: 2,
        userName: "Bob lemon",
        type: "Admin",
        email: "Bob@Bob.com",
        Level: 1,
        zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2"],
        active: false
    },
    {
        id: 3,
        userName: "Max torus",
        type: "Admin",
        email: "max@max.com",
        Level: 2,
        zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2"],
        active: true
    },
    {
        id: 4,
        userName: "George Smith",
        type: "Admin",
        email: "george@george.com",
        Level: 1,
        zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2"],
        active: true
    },
    {
        id: 5,
        userName: "Sharon jane",
        type: "Admin",
        email: "Sharon@Sharon.com",
        Level: 1,
        zones: ["room Alpha", "room Beta", "Veg Room 1", "veg Room 2"],
        active: true
    },
]

const EditUserButton = withStyles((theme) => ({

    root: {
        borderRadius:"32px",
        boxShadow:`1px 1px 1px 1px ${theme.palette.secondary.main}`,
        color:"white",
        background:theme.palette.roomStatus.fault,
        '&:hover': {
            background:theme.palette.primary.main,
            border: `solid 1px ${theme.palette.primary.main}`,
            boxShadow: 'none',
            color:"black"
          },
    },
    
}))(Button);

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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),
        rgba(0, 0, 0, 0.5)), url("https://ak1.picdn.net/shutterstock/videos/27265981/thumb/1.jpg")`,
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
    }


}));







  const UserWidget = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const zones = props.zones;

    const Row = ({ index, style }) => (
        <div style={style}><ListItemIcon><CheckCircleRoundedIcon style={{color:theme.palette.primary.main,fontSize:"18px"}}/></ListItemIcon>{zones[index]}</div>
      );
    return (
        <Grid item container direction={"row"} className={classes.userInfoContainer} xs>
            <Grid item container xs className={classes.Profile} direction={"column"} alignItems={"center"}>
                <Grid item xs></Grid>
                <Grid item xs > <Typography variant={"h6"} >{props.userName}</Typography></Grid>
                <Grid item xs ><Box className={classes.accountCircle}><AccountCircleRoundedIcon style={{ fontSize: "64px", color: theme.palette.primary.main }} /></Box></Grid>
                <Grid item xs></Grid>
                <Grid item xs>{props.type}</Grid>
                <Grid item xs><Typography variant={"body2"} style={{color:theme.palette.roomStatus.veg}}>{props.email}</Typography></Grid>
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
                        <EditUserButton variant={"contained"}>Edit user</EditUserButton>
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    );
}

export default requireAuth(function UsersPage(props) {
    const classes = useStyles();

    const [state, setState] = React.useState({ //setState
        Users: props.Users || exampleUsers,
        pick: 1,
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

    const handleTabChange = (event, newValue) => {
        setState({
            ...state,
            pick: newValue
        });
    }

    

    return (
        <Container className={"containerMain"}>
            <Grid container item direction={"column"} spacing={5} className={classes.usersPageWidget} alignItems={"center"}>
                <Grid item container direction={'row'} style={{paddingRight:"24px"}}>
                    
                    <Grid item xs>
                        <Typography variant={"h4"}>Manage Users</Typography>
                    </Grid>
                    <Grid item xs></Grid>
                </Grid>
                <Grid item container direction={"row"} spacing={5} style={{marginRight:"64px"}} alignItems={"center"} alignContent={"center"}>
                    {state.Users.map((item, index) => {
                        return (
                            <UserWidget key={index} UserIndex={index} userName={item.userName} email={item.email} type={item.type} zones={state.Users[index].zones}/>
                        );
                    })}
                </Grid>
            </Grid>
        </Container>
    )
})

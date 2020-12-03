import React, { useEffect, useState } from "react";

import { compose } from "redux";
import { connect, useSelector, shallowEqual } from "react-redux";

import agroLogo from "./../../img/AgroMationLogosquare512.png"
import { useTheme, makeStyles, Container, Grid, Typography, Divider, Snackbar, Button, List, ListItem, ListItemText } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
//User imports
import { EditUserInput, EditUserButton, validateEmail, validatePhone } from "../../containers/UsersPage/UsersPage";
import { setUser } from "../../actions/User"
//firebase
import { db, auth } from "../../consts/firebase";
import { Fullscreen } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
    settingsWidget: {
        backgroundImage: ` url("https://cdn.discordapp.com/attachments/370759274621698048/755271571181928459/unknown.png")`,
        backgroundRepeat: "repeat-x",
        backgroundColor: theme.palette.secondary.main,
        width: "100%",
        minHeight: "512px",
        padding: "24px",
        color: "white",
    },
    monthlyButton: {
        background: theme.palette.secondary.dark,
        minHeight: "36px",
        maxHeight: "48px",
        minWidth: "64px",
        maxWidth: "128px",
        borderRadius: '4px 0px 0px 4px',


    },
    annualButton: {
        background: theme.palette.secondary.dark,
        minHeight: "36px",
        maxHeight: "48px",
        minWidth: "64px",
        maxWidth: "128px",
        borderRadius: '0px 4px 4px 0px',
    },
    monthlyOrAnnualButtonSelected: {
        background: theme.palette.secondary.vdark,
        color: theme.palette.primary.main,
    },
    SubscriptionChoicesTable: {
        border: "solid 1px white",
    },
    SubscriptionGlobalText: {
        margin: "12px"
    },

}));


const SubscriptionChoicePage = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const prevPageState = props.history.location.state;

    let { user, authData } = useSelector(state => ({
        user: state.users.user,
        authData: state.auth.authenticated,


    }), shallowEqual);

    //check if data has loaded and if not display loading text
    if (user.firstName === undefined || user.location.length === undefined) {
        // console.log("settings loading data")
        user = {
            firstName: "loading",
            lastName: "loading",
            email: "loading",
            phone: "set phone",
            location: [
                {
                    name: "loading",
                    address: "Loading Address"
                },
                {
                    name: "loading locations",
                    address: "loading address"
                },

            ]
        };
    }

    let isMonthlyTrue = true;
    if (prevPageState.PaymentType === "Annual") {
        isMonthlyTrue = false;
    }
    const [state, setState] = useState({
        monthly: isMonthlyTrue,
    })

    const handleMonthlySwitch = () => {
        setState({
            ...state,
            monthly: true,
        })
    }
    const handleAnnualSwitch = () => {
        setState({
            ...state,
            monthly: false,

        })
    }



    return (
        <Container className={"containerMain"}>
            <Grid item container direction={"row"} className={classes.settingsWidget} spacing={0} >
                <Grid item container direction={'column'} xs={12} justify={'center'} alignItems="center">
                    <Typography variant={'h5'} > Choose Your Plan</Typography>
                    <Typography variant={'body1'}> Get the features you need and control your systems remotely </Typography>
                </Grid>

                {/* This is the Annual or monthly button container */}
                <Grid item container direction={'row'} justify={'center'}>
                    <Grid item container xs={6} className={state.monthly ? (`${classes.monthlyButton} + ${classes.monthlyOrAnnualButtonSelected}`) : (classes.monthlyButton)} onClick={handleMonthlySwitch} justify={'center'} alignItems="center">
                        <Typography variant={'body2'} color={state.monthly ? ("primary") : ("error")}>Monthly</Typography>
                    </Grid>
                    <Grid item container xs={6} className={state.monthly ? (classes.annualButton) : (`${classes.annualButton} + ${classes.monthlyOrAnnualButtonSelected}`)} onClick={handleAnnualSwitch} justify={'center'} alignItems="center">
                        <Typography variant={'body2'} color={state.monthly ? ("error") : ("primary")}>Annual</Typography>
                    </Grid>
                </Grid>
                {/* Table with different subscriptions  */}
                <Grid item container xs={12} >
                    {/* Premium Plan */}
                    <Grid item container xs={12} sm={4} direction={'column'} justify={'flex-start'} alignItems="center" className={classes.SubscriptionChoicesTable} >

                        <Typography className={classes.SubscriptionGlobalText} variant={'h6'}>Premium</Typography>
                        <Typography className={classes.SubscriptionGlobalText} variant={'body1'} >For Facilities that want the data to compete with confidence.</Typography>
                        <Typography className={classes.SubscriptionGlobalText} variant={'h6'}>{state.monthly ? ("$50 / Month") : ("$540 / Year. 10% off!")}</Typography>
                        <Typography className={classes.SubscriptionGlobalText} variant={'body1'}>5 seats</Typography>

                        <Button variant={"outlined"} color={"primary"} >
                            Select Plan
                        </Button>
                        <Divider style={{ background: "white", width: "100%", marginTop: "16px" }} variant={'fullWidth'} />
                        <List>

                            <ListItem>
                                <ListItemText>
                                    Monitor Rooms
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Control Set Points
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Control High Low alarms
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Manage user Permissions
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Basic Reporting
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                    {/* Business plan */}
                    <Grid item container xs={12} sm={4} direction={'column'} justify={'flex-start'} alignItems="center" className={classes.SubscriptionChoicesTable} >

                        <Typography className={classes.SubscriptionGlobalText} variant={'h6'}>Business</Typography>
                        <Typography className={classes.SubscriptionGlobalText} variant={'body1'}>For Business and teams to manage production environments.</Typography>
                        <Typography className={classes.SubscriptionGlobalText} variant={'h6'}>{state.monthly ? ("$100 / Month") : ("$1080 / Year. 10% off!")}</Typography>
                        <Typography className={classes.SubscriptionGlobalText} variant={'body1'}>10 seats</Typography>
                        <Button variant={"outlined"} color={"primary"} >
                            Select Plan
                        </Button>
                        <Divider style={{ background: "white", width: "100%", marginTop: "16px" }} variant={'fullWidth'} />
                        <List>

                            <ListItem>
                                <ListItemText>
                                    Monitor Rooms
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Control Set Points
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Control High Low alarms
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Manage user Permissions
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Basic Reporting
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Advanced Analytics
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Advanced Notifications
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item container xs={12} sm={4} direction={'column'} justify={'flex-start'} alignItems="center" className={classes.SubscriptionChoicesTable} >

                        <Typography className={classes.SubscriptionGlobalText} variant={'h6'}>Enterprise</Typography>
                        <Typography className={classes.SubscriptionGlobalText} variant={'body1'}>For organizations that need additional security, control, and support.</Typography>
                        <Typography className={classes.SubscriptionGlobalText} variant={'h6'}>{state.monthly ? ("Custom pricing") : ("Custom long term pricing")}</Typography>
                        <Typography className={classes.SubscriptionGlobalText} variant={'body1'}>Contact for pricing</Typography>
                        <Button variant={"outlined"} color={"primary"} >
                            Contact US
                        </Button>
                        <Divider style={{ background: "white", width: "100%", marginTop: "16px" }} variant={'fullWidth'} />
                        <List>

                            <ListItem>
                                <ListItemText>
                                    Monitor Rooms
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Control Set Points
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Control High Low alarms
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Manage user Permissions
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Basic Reporting
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Advanced Analytics
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Advanced Notifications
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    Custom Features
                                </ListItemText>
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}


function mapStateToProps(state) {
    return { state };
}


const formedComponent = compose(connect(mapStateToProps, { setUser: setUser }))(SubscriptionChoicePage);


export default formedComponent;
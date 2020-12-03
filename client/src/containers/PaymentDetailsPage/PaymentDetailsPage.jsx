import React, { useEffect, useState } from "react";

import { compose } from "redux";
import { connect, useSelector, shallowEqual } from "react-redux";

import agroLogo from "./../../img/AgroMationLogosquare512.png"
import { useTheme, makeStyles, Container, Grid, Typography, Divider, Snackbar, Button, List, ListItem, ListItemText, MenuItem, Select } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
//User imports
import { EditUserInput, EditUserButton, validateEmail, validatePhone } from "../../containers/UsersPage/UsersPage";
import { setUser } from "../../actions/User"
//firebase
import { db, auth } from "../../consts/firebase";
import { StandardRoundSelectForm } from "../../components/StandardSelect/StandardSelect";



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
    yourPlanPanel: {
        background: theme.palette.secondary.vdark,
        padding: "12px",
        borderRadius: "4px",
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: "80%",
    },


}));

const PaymentDetailsPage = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const prevPageState = props.history.location.state;

    let pick = 0;
    if (prevPageState !== undefined && prevPageState.PaymentType === "Annual") {
        pick = 1;
    }
    const [state, setState] = useState({
        pick: pick,
    })

    const handleChange = (event) => {
        console.log(event.target.value)
        setState({
            ...state,
            pick: event.target.value,
        })
    }

    return (
        <Container className={"containerMain"}>
            <Grid item container direction={"row"} className={classes.settingsWidget} spacing={2} >
                {<Grid item container direction={'column'} xs={12} justify={'center'} alignItems="center">
                    <Typography variant={'h5'} > Get started with your free trial</Typography>
                    <Typography variant={'body1'}> Free for 30 days, Cancel anytime</Typography>
                </Grid>
                }
                {/* Your Plan and Payment Details */}
                <Grid item container direction={"column"} xs={12} sm={6} md={8}>
                    <Grid item container direction={'row'} className={classes.yourPlanPanel} spacing={1}>
                        <Grid item xs={8} md={10}>
                            <Typography variant={'h5'}> Your Plan</Typography>
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <Typography variant={'body1'} color={'primary'}> Change Plan</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body1"}>
                                Email@domain.com
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body1"}>
                                Business Plan - 5 seats
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h6"}>
                                $100 per Month
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item container direction={'row'} className={classes.yourPlanPanel} style={{marginTop:"32px"}} spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant={'h5'}> Payment Details</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'body1'}>Don't worry you can cancel anytime</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            
                        </Grid>
                    </Grid>
                </Grid>
                {/* Billing/PayNow side */}
                <Grid item container direction={'column'} xs={12} sm={6} md={4} >
                    <Grid item container direction={'row'} className={classes.yourPlanPanel} spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant={'h5'}>Billing</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <StandardRoundSelectForm className={classes.formControl} hiddenLabel >
                                {/* <InputLabel style={{alignItems:"center",color:"white"}}>Location</InputLabel> */}
                                <Select
                                    value={state.pick}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'pick',
                                        id: 'Payment-Plan-Type',
                                    }}
                                    defaultValue={0}
                                >
                                    {["Monthly Plan", "Annual Plan"].map((Item, Index) => (
                                        <MenuItem key={Index} value={Index}>{Item}</MenuItem>
                                    ))}
                                </Select>
                            </StandardRoundSelectForm>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'body2'} style={{ color: theme.palette.roomStatus.veg }}> Switch to Annual plan and save 10% </Typography>
                        </Grid>

                        <Divider style={{ background: theme.palette.secondary.main, width: "100%", marginTop: "128px", marginBottom: "24px" }} variant={'fullWidth'} />
                        <Grid item xs={6}>
                            <Typography variant={'h6'}>Due Today</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant={'h6'}>$100.00 USD</Typography>
                            <Typography variant={'body2'}>+ applicable fees</Typography>
                        </Grid>
                        
                        <Grid item xs={12} style={{marginTop:"24px"}}>
                            <Button variant={"outlined"} color={"primary"} style={{ width: "90%" }}>
                                Pay now
                        </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );

}

function mapStateToProps(state) {
    return { state };
}


const formedComponent = compose(connect(mapStateToProps, { setUser: setUser }))(PaymentDetailsPage);


export default formedComponent;
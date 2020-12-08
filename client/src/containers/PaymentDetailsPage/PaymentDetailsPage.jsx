import React, { useEffect, useState } from "react";

import { compose } from "redux";
import { connect, useSelector, shallowEqual } from "react-redux";

import agroLogo from "./../../img/AgroMationLogosquare512.png"
import { useTheme, makeStyles, Container, Grid, Typography, Divider, Snackbar, Button, List, ListItem, ListItemText, MenuItem, Select } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { loadStripe } from '@stripe/stripe-js';
import moment from "moment";
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
import { createPortalLink, db, auth, StripeTestKey } from "../../consts/firebase";
import { StandardRoundSelectForm } from "../../components/StandardSelect/StandardSelect";

import "./index.css"

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
    changePlanButton: {
        textDecoration: "underline",
        '&:hover': {
            // fontSize:"18px",
            fontWeight: 900,
        }
    },
    StipeFormControl: {
        background: "white",
    }


}));



/// card number that always works  4242424242424242
/// card number that fails for  "insufficient_funds"   || 4000000000009995


const PaymentDetailsPage = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const prevPageState = props.history.location.state;

    let pick = 0;
    let PlanType = 0

    const PlanText = ["Premium Plan - 5 seats", "Business Plan - 10 seats"];
    const BusinessPaymentPlanText = ['$99.99 per Month', "$1079.99 per Year "];
    const PremiumPaymentPlanText = ['$49.99 per Month', '$539.99 per year'];
    const DueTodayText = ['$ 49.99 USD', '$539.99 USD', '$99.99 USD', "$1079.99 USD"];

    const PremiumPlanID = ["price_1Hu9bfHUiGgklW51C6da93HQ", 'price_1Hu9bfHUiGgklW5140h11XmN'];
    const BusinessPlanID = ['price_1Hu9dkHUiGgklW51PpDQ1XZY', 'price_1Hu9dkHUiGgklW51cJ6V5TPJ'];

    // Parse Previous state
    if (prevPageState !== undefined) {
        if (!prevPageState.PaymentType) {
            pick = 1;
        }
        if (prevPageState.PlanType === 'Business') {
            PlanType = 1;
        }
    }

    let { user, authData } = useSelector(state => ({
        user: state.users.user,
        authData: state.auth.authenticated,


    }), shallowEqual);

    let activeAccount = false;
    //check if data has loaded and if not display loading text
    if (user.firstName === undefined || user.location.length === undefined) {
        // console.log("settings loading data")
        user = {
            firstName: "loading",
            lastName: "loading",
            email: "loading",
            phone: "set phone",
            subscription: { status: null },
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

    let accountType = "Free";
    let accountInterval = "month";
    let accountBillDue = "$ 50.00";
    let accountBillDueDate = "";

    if (user.subscription.status && user.subscription.status === 'active') {
        activeAccount = true;
        accountType = user.subscription.role[0].toUpperCase() + user.subscription.role.substring(1);
        accountInterval = user.subscription.interval[0].toUpperCase()+ user.subscription.interval.substring(1);
        accountBillDue = "$"+ user.subscription.unitCost/100;
        if(accountType === 'Business'){
            PlanType = 1;
        }
        if(accountInterval === 'Year'){
            pick=1;
        }
        //     let dueDateObj = moment.unix(user.subscription.current_period_end.seconds);
        //     accountBillDueDate = dueDateObj.format('MMMM, Do, YYYY');
    }



    console.log(pick)
    const [state, setState] = useState({
        pick: pick,
        PlanType: PlanType,
    })

    const handleChange = (event) => {
        console.log(event.target.value)
        setState({
            ...state,
            pick: event.target.value,
        })
    }

    const handleChangePlanType = () => {
        props.history.push({
            pathname: "/Subscribe",
            state: {
                PaymentType: `${state.pick === 0 ? ("Monthly") : ("Annual")}`
            }
        })
    }

    const GeneratePlanText = () => {
        if (activeAccount) {
            return accountBillDue+ " per " + accountInterval;
        }
        if (PlanType === 0) {
            if (state.pick === 0) {
                return PremiumPaymentPlanText[0]
            } else {
                return PremiumPaymentPlanText[1]
            }
        } else {
            if (state.pick === 0) {
                return BusinessPaymentPlanText[0]
            } else {
                return BusinessPaymentPlanText[1]
            }
        }
    }

    const GenerateDueTodayString = () => {
        if (activeAccount) {
            return "$ 0.00 USD";
        }
        if (PlanType === 0) {
            if (state.pick == 0) {
                return DueTodayText[0];
            } else {
                return DueTodayText[1];
            }
        } else {
            if (state.pick == 0) {
                return DueTodayText[2];
            } else {
                return DueTodayText[3];
            }
        }
    }

    const GeneratePriceID = () => {
        if (PlanType === 0) {
            if (state.pick == 0) {
                return PremiumPlanID[0];
            } else {
                return PremiumPlanID[1];
            }
        } else {
            if (state.pick == 0) {
                return BusinessPlanID[0];
            } else {
                return BusinessPlanID[1];
            }
        }
    }



    const StartCheckoutFlow = async () => {
        const docRef = await db
            .collection('StripeCustomers')
            .doc(user.UID)
            .collection('checkout_sessions')
            .add({
                price: GeneratePriceID(),
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

        docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
            if (error) {
                console.log(snap);

                // Show an error to your customer and 
                // inspect your Cloud Function logs in the Firebase console.
                alert(`An error occured: ${error.message}`);
            }
            if (sessionId) {
                // We have a session, let's redirect to Checkout
                // Init Stripe
                const stripe = await loadStripe(StripeTestKey);
                stripe.redirectToCheckout({ sessionId });
            }
        });
    }

    const EditSubscription = () => {
        createPortalLink()
    }

    const handleBack = () => {
        props.history.push({
            pathname:"/Subscribe"
          })
    }

    return (
        <Container className={"containerMain"}>
            <Grid item container direction={"row"} className={classes.settingsWidget} spacing={2} >
            <Grid item container xs={4} sm={2} md={1}>
                    <Button variant={'outlined'} color={'primary'} style={{maxHeight:"48px", marginRight:"12px"}} onClick={handleBack}>Back</Button>
                </Grid>
                <Grid item container direction={'column'} xs={8} sm={10} md={11} justify={'center'} alignItems="center">
                    <Typography variant={'h5'} > Get started with your free trial</Typography>
                    <Typography variant={'body1'}> Free for 30 days, Cancel anytime</Typography>
                </Grid>
                
                {/* Your Plan and Payment Details */}
                <Grid item container direction={"column"} xs={12} sm={6} md={8}>
                    <Grid item container direction={'row'} className={classes.yourPlanPanel} spacing={1}>
                        <Grid item xs={8} md={10}>
                            <Typography variant={'h5'} > Your Plan</Typography>
                        </Grid>
                        <Grid item xs={4} md={2} onClick={handleChangePlanType}>
                            <Typography variant={'body1'} color={'primary'} className={classes.changePlanButton}> Change Plan</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body1"}>
                                {user.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"body1"}>
                                {PlanType === 0 ? (PlanText[0]) : (PlanText[1])}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={"h6"}>
                                {GeneratePlanText()}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item container direction={'row'} className={classes.yourPlanPanel} style={{ marginTop: "32px" }} spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant={'h5'}> Payment Details</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'subtitle1'}>Don't worry you can cancel anytime</Typography>
                        </Grid>
                        <Grid item xs={12}>
                        <Typography variant={'body1'}>We use Stripe to handle our payment processing. They handle all your billing information securely. We never store your credit card information or billing address.
                        By subscribing to our service you agree to our terms of use that can be found here. You can also find our updated privacy policy here.</Typography>
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
                                    defaultValue={pick}
                                >
                                    {["Monthly Plan", "Annual Plan"].map((Item, Index) => (
                                        <MenuItem key={Index} value={Index}>{Item}</MenuItem>
                                    ))}
                                </Select>
                            </StandardRoundSelectForm>
                        </Grid>
                        <Grid item xs={12}>
                            {state.pick === 0 ?
                                (<Typography variant={'body2'} style={{ color: theme.palette.roomStatus.veg }}> Switch to Annual plan and save 10% </Typography>) :
                                (<div></div>)}

                        </Grid>

                        <Divider style={{ background: theme.palette.secondary.main, width: "100%", marginTop: "128px", marginBottom: "24px" }} variant={'fullWidth'} />
                        <Grid item xs={6}>
                            <Typography variant={'h6'}>Due Today</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant={'h6'}>{GenerateDueTodayString()}</Typography>
                            <Typography variant={'body2'}>+ applicable fees</Typography>
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: "24px" }}>
                            {activeAccount ? (<Button variant={"outlined"} color={"primary"} style={{ width: "90%" }} onClick={EditSubscription}>
                                Edit Subscription
                            </Button>) :
                                (<Button variant={"outlined"} color={"primary"} style={{ width: "90%" }} onClick={StartCheckoutFlow}>
                                    Pay now
                                </Button>)}
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
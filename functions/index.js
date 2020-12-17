const functions = require('firebase-functions');
var admin = require("firebase-admin");
const moment = require('moment');

var serviceAccount = require("./agroFireBaseAdmin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://agromation-grow-room-control.firebaseio.com"
});

const db = admin.firestore();

exports.SetAccountViewer = functions.https.onCall(async (data, context) => {
    if (context.auth.token.accountType === "admin" || context.auth.token.accountType === "owner" || context.auth.token.accountType === "super") {
        try {
            let res = await admin.auth().setCustomUserClaims(data.uid, { accountType: "viewer", stripeRole: context.auth.token.stripeRole })
            return ({
                status: "success",
                auth: context.auth.uid
            });

        } catch (err) {
            return ({
                error: err,
                UID: context.auth.uid,
                TargetUID: data.uid
            })
        }
    }
    else {
        functions.logger.warn("Invalid access:", {
            uid: context.auth.token.uid,
            type: context.auth.token.accountType
        });
        return ({
            error: "Invalid Access",
            type: context.auth.token.accountType
        })
    }
    // Allow access to requested admin resource.

});

//Takes a uid and sets that UID with the account type User
exports.SetAccountUser = functions.https.onCall(async (data, context) => {
    if (context.auth.token.accountType === "admin" || context.auth.token.accountType === "owner" || context.auth.token.accountType === "super") {
        try {
            let res = await admin.auth().setCustomUserClaims(data.uid, { accountType: "user", stripeRole: context.auth.token.stripeRole })
            return ({
                status: "success",
                auth: context.auth.uid
            });

        } catch (err) {
            return ({
                error: err,
                UID: context.auth.uid,
                TargetUID: data.uid
            })
        }
    }
    else {
        functions.logger.warn("Invalid access:", {
            uid: context.auth.token.uid,
            type: context.auth.token.accountType
        });
        return ({
            error: "Invalid Access",
            type: context.auth.token.accountType
        })
    }
    // Allow access to requested admin resource.

});

//Takes a uid and sets that UID with the account type admin
exports.SetAccountAdmin = functions.https.onCall(async (data, context) => {
    functions.logger.log("giving " + data.uid + " the Admin account type", context.auth.uid);
    if (context.auth.token.accountType === "admin" || context.auth.token.accountType === "owner" || context.auth.token.accountType === "super") {
        try {
            let res = await admin.auth().setCustomUserClaims(data.uid, { accountType: "admin", stripeRole: context.auth.token.stripeRole })
            return ({
                status: "success",
                auth: context.auth
            });

        } catch (err) {
            return ({
                error: err,
                UID: context.auth.uid,
                TargetUID: data.uid
            })
        }
    }
    else {
        functions.logger.warn("Invalid access:", {
            uid: context.auth.token.uid,
            type: context.auth.token.accountType
        });
        return ({
            error: "Invalid Admin Access",
            type: context.auth.token.accountType
        })
    }


});

//Takes a uid and sets that UID with the account type Owner
exports.SetAccountOwner = functions.https.onCall(async (data, context) => {
    if (context.auth.token.accountType === "super") {
        try {
            let res = await admin.auth().setCustomUserClaims(data.uid, { accountType: "owner", stripeRole: context.auth.token.stripeRole })
            return ({
                status: "success",
                auth: context.auth.uid
            });

        } catch (err) {
            return ({
                error: err,
                UID: context.auth.uid,
                TargetUID: data.uid
            })
        }
    }
    else {
        functions.logger.warn("Invalid access:", {
            uid: context.auth.token.uid,
            type: context.auth.token.accountType
        });
        return ({
            error: "Invalid Access",
            type: context.auth.token.accountType
        })
    }
    // Allow access to requested admin resource.

});

//Takes a uid and sets that UID with the account type super
exports.SetAccountSuper = functions.https.onCall(async (data, context) => {
    functions.logger.warn("giving " + data.uid + " the super account type", context.auth.uid);
    if (context.auth.token.accountType === "super") {
        try {
            let res = await admin.auth().setCustomUserClaims(data.uid, { accountType: "super", stripeRole: 'super' })
            return ({
                status: "success",
                auth: context.auth
            });

        } catch (err) {
            return ({
                error: err,
                UID: context.auth.uid,
                TargetUID: data.uid
            })
        }
    }
    else {
        functions.logger.warn("Invalid access:", {
            uid: context.auth.token.uid,
            type: context.auth.token.accountType
        });
        return ({
            error: "Invalid Admin Access",
            type: context.auth.token.accountType
        })
    }


});

//takes an email and returns the uid of the auth account if it exists
exports.FetchUidByEmail = functions.https.onCall(async (data, context) => {
    if (context.auth.token.accountType === "admin" || context.auth.token.accountType === "owner" || context.auth.token.accountType === "super") {
        //first make sure the email being created exists and it has a base auth claim
        if (data.email) {
            //then we are going to see if the user exists and if so return the UID to the client
            try {
                //looks for auth user by email
                let authUser = await admin.auth().getUserByEmail(data.email)
                //if the auth user exists return their UID
                if (authUser.uid) {
                    return ({
                        status: "success getting user",
                        auth: context.auth,
                        uid: authUser.uid,
                    });
                } else {
                    return ({
                        error: "UID not present",
                        msg: "Error looking for account by email",
                        UID: context.auth.uid,
                    })
                }

            } catch (err) {
                return ({
                    error: err,
                    msg: "Error looking for account by email",
                    UID: context.auth.uid,
                })
            }
        }
        else{
            return ({
                error: "missing email or accountType",
                type: context.auth.token.uid,
                input:data,
            })
        }

    }
    else {
        functions.logger.error("Invalid access:", {
            uid: context.auth.token.uid,
            type: context.auth.token.accountType
        });
        return ({
            error: "Invalid Access",
            type: context.auth.token.accountType
        })
    }
    // Allow access to requested admin resource.

});

//takes the email and creates an account and returns a uid
exports.CreateMangedAccount = functions.https.onCall(async (data, context) => {
    if (context.auth.token.accountType === "admin" || context.auth.token.accountType === "owner" || context.auth.token.accountType === "super") {
        //first make sure the email being created exists and it has a base auth claim
        if (data.email) {
             try {
                let res = await admin.auth().createUser({ email: data.email })
                //return the new auth user
                return ({
                    status: "success creating user",
                    auth: context.auth,
                    uid: res.uid,
                });
            } catch (err) {
                return ({
                    error: err,
                    msg: "Error making new auth account",
                    UID: context.auth.uid,
                })
            }
        }
        else{
            return ({
                error: "missing email or accountType",
                type: context.auth.token.uid,
                input:data,
            })
        }

    }
    else {
        functions.logger.error("Invalid access:", {
            uid: context.auth.token.uid,
            type: context.auth.token.accountType
        });
        return ({
            error: "Invalid Access",
            type: context.auth.token.accountType
        })
    }
    // Allow access to requested admin resource.

});

exports.DeleteMangedAccount = functions.https.onCall(async (data, context) => {
    if (context.auth.token.accountType === "admin") {
        try {
            let res = await admin.auth().deleteUser(data.uid, { accountType: "admin", stripeRole: 'admin' })
            return ({
                status: "success",
                auth: context.auth
            });

        } catch (err) {
            return ({
                error: err,
                UID: context.auth.uid,
                TargetUID: data.uid
            })
        }
    }
    else {
        return ({
            error: "Invalid Access",
            type: context.auth.token.accountType
        })
    }
    // Allow access to requested admin resource.

});

exports.getAuthContext = functions.https.onCall(async (data, context) => {
    return ({
        auth: context.auth
    });
});


//NEEDS TESTING
//watched the stripe subscription documents and handles propagating changes
// when the status changes it removes auth claims from managed accounts
// when the status changes to active or trialing it adds auth claims to any managed accounts 
// when the role changes is propagates the role to the managed accounts
exports.onStripeSubChange = functions.firestore.document(`StripeCustomers/{StripeCustomerId}/subscriptions/{subscriptionId}`)
    .onWrite(async (change, context) => {
        functions.logger.warn("StripeSub updating auth claims for OwnerID:", context.params.StripeCustomerId);
        //check if there was a change to the stripe account status
        if (change.before.data().status !== change.after.data().status) {
            //handle disabling auth claims for managed Users
            if (change.after.data().status === 'canceled' || change.after.data().status === 'refunded') {
                functions.logger.warn("StripeSub Revoking Auth claims:", change.after.data().status);
                //get managed users for this UID context.auth.uid
                try {
                    let querySnapshot = await db.collection('Users').where('accountOwner', '==', context.params.StripeCustomerId).get()
                    //check if managed users exist
                    if (!querySnapshot.empty) {
                        //iterate through the managed users and update their auth claim
                        querySnapshot.forEach(async (doc) => {
                            if (doc.exists) {
                                let uid = doc.data().UID;
                                if (uid) {
                                    try {
                                        let res = await admin.auth().setCustomUserClaims(uid, { accountType: "user", stripeRole: null })
                                    } catch (err) {
                                        functions.logger.error("Error updating auth claims for:", { UID: doc.data().UID, error: err });
                                    }

                                } else {
                                    functions.logger.error("StripeSub Updating Auth claims for this account:", doc.data());
                                }

                            }
                        });
                    }
                    //handle setting the auth claim for each user.
                } catch (err) {
                    console.log(err)
                }

            }
            //handle enabling auth claims for managed users
            if (change.after.data().status === 'trialing' || change.after.data().status === 'active') {
                functions.logger.warn("StripeSub Updating Auth claims:", change.after.data().status);
                //get managed users for this UID context.auth.uid
                try {
                    let querySnapshot = await db.collection('Users').where('accountOwner', '==', context.params.StripeCustomerId).get()
                    //check if managed users exist
                    if (!querySnapshot.empty) {
                        //iterate through the managed users and update their auth claim
                        querySnapshot.forEach(async (doc) => {
                            if (doc.exists) {
                                // functions.logger.warn("StripeSub Updating Auth claims for this account:", doc.data());
                                let uid = doc.data().UID;
                                if (uid) {
                                    try {
                                        let res = await admin.auth().setCustomUserClaims(uid, { accountType: "user", stripeRole: change.after.data().role })
                                    } catch (err) {
                                        functions.logger.error("Error updating auth claims for:", { UID: doc.data().UID, error: err });
                                    }

                                }
                                else {
                                    functions.logger.error("StripeSub Updating Auth claims for this account:", doc.data());
                                }

                            }
                        });
                    }
                    //handle setting the auth claim for each user.
                } catch (err) {
                    console.log(err)
                }
            }

        }
        //check if there was a stripe role change
        if (change.before.data().role !== change.after.data().role) {
            functions.logger.warn("StripeSub Revoking Auth claims:", change.after.data().role);
            //hanlde changes to the role
            if (change.after.data().role === 'premium' || change.after.data().role === 'business' || change.after.data().role === 'enterprise') {
                //get managed users for this UID context.auth.uid
                try {
                    let querySnapshot = await db.collection('Users').where('accountOwner', '==', context.params.StripeCustomerId).get()
                    //check if managed users exist
                    if (!querySnapshot.empty) {
                        //iterate through the managed users and update their auth claim
                        querySnapshot.forEach(async (doc) => {
                            if (doc.exists) {
                                let uid = doc.data().UID;
                                if (uid) {
                                    try {
                                        let res = await admin.auth().setCustomUserClaims(uid, { accountType: "user", stripeRole: change.after.data().role })
                                    } catch (err) {
                                        functions.logger.error("Error updating auth claims for:", { UID: doc.data().UID, error: err });
                                    }

                                } else {
                                    functions.logger.error("StripeSub Updating Auth claims for this account:", doc.data());
                                }

                            }
                        });
                    }
                    //handle setting the auth claim for each user.
                } catch (err) {
                    console.log(err)
                }
            }
        }
    });

//Takes a uid and accountType and updates the managed user with the correct auth claim.
exports.SetManagedAccountClaims = functions.https.onCall(async (data, context) => {
    let { uid, accountType, stripeRole } = data;
    //first verify the caller is authorized 
    if (context.auth.token.accountType === "admin" || context.auth.token.accountType === "owner") {
        //check and make sure the user has a stripe auth claim
        if (context.auth.token.stripeRole === 'premium' || context.auth.token.stripeRole === 'business') {
            //verify that the uid and accountType claim is supplied
            if (uid && accountType) {
                //make sure the account type is one of the two valid types
                if (accountType === 'admin' || accountType === "user" || accountType === "viewer") {
                    //try and update the users auth claim
                    try {
                        let res = await admin.auth().setCustomUserClaims(uid, { accountType: accountType, stripeRole: context.auth.token.stripeRole })
                        return ({
                            status: "success",
                            auth: context.auth.uid,
                            TargetUID: data.uid,
                        });

                    } catch (err) {
                        return ({
                            error: err,
                            UID: context.auth.uid,
                            TargetUID: data.uid,
                            accountType:accountType
                        })
                    }
                } else {
                    return ({
                        error: "Invalid account type ",
                        type: accountType
                    })
                }

            } else {
                return ({
                    error: "Either the UID or accountType is missing",
                    type: data
                })
            }

        }
        else {
            return ({
                error: "Invalid Access no Stripe auth claim present",
                type: context.auth.token.stripeRole
            })
        }

    }else if (context.auth.token.accountType === "super"){
        if (uid && accountType && stripeRole) {
            //make sure the account type is one of the four valid types
            if (accountType === 'owner' || accountType === 'admin' || accountType === "user" || accountType === "viewer") {
                //try and update the users auth claim
                try {
                    let res = await admin.auth().setCustomUserClaims(uid, { accountType: accountType, stripeRole: context.auth.token.stripeRole })
                    return ({
                        status: "success",
                        auth: context.auth.uid,
                        TargetUID: data.uid,
                    });

                } catch (err) {
                    return ({
                        error: err,
                        UID: context.auth.uid,
                        TargetUID: data.uid,
                        accountType:accountType
                    })
                }
            } else {
                return ({
                    error: "Invalid account type ",
                    type: accountType
                })
            }

        } else {
            return ({
                error: "Either the UID or accountType is missing or stripeRole ",
                type: data
            })
        }
    }
    else {
        return ({
            error: "Invalid Admin Access",
            type: context.auth.token.accountType
        })
    }


});

//This function takes the deviceID and interval and number of records and returns the live data for that controller.
exports.FetchLiveDeviceData = functions.https.onCall(async (data, context) => {
    let { numberOfRecords, interval, deviceID } = data;
    let time = [];

    if (!numberOfRecords) {
        numberOfRecords = 20;
    }
    if (!interval) {
        interval = 10;
    }
    //try and get the live data from Azure or wherever we store it
    //temp generate time data based on the current time and an interval of ten minutes
    let now = moment();
    let Start = now.subtract(numberOfRecords * interval, 'minutes');
    time.push(Start);
    for (let i = 1; i <= numberOfRecords; i++) {
        time.push(Start.add(i * interval, 'minutes'))
    }

    if (deviceID === "AgroOffice") {
        return ({
            temp: [73.51, 73.64, 73.59, 73.67, 73.71, 73.78, 73.83, 73.9, 73.92, 73.98, 74.11, 74.15, 74.21, 74.13, 73.99, 73.91, 73.85, 73.79, 73.72, 73.64],
            humidity: [0.45, 0.45, 0.45, 0.45, 0.44, 0.44, 0.44, 0.44, 0.43, 0.43, 0.43, 0.43, 0.43, 0.43, 0.44, 0.44, 0.44, 0.44, 0.45, 0.45,],
            CO2: [2999, 2994, 2990, 2996, 2999, 2994, 2990, 2996, 2999, 2994, 2990, 2996, 2999, 2994, 2990, 2996, 2999, 2994, 2990, 2996,],
            VPD: [1114, 1113, 1112, 1113, 1114, 1113, 1112, 1113, 1114, 1113, 1112, 1113, 1114, 1113, 1112, 1113, 1114, 1113, 1112, 1113,],
            time: time
        })
    }
    return ({
        error: "DeviceID not found",
        data: data,
    })

});

// //function called by the data acquisition device when the 
// exports.AddNotification = functions.https.onCall( async (data, context) => {

// });
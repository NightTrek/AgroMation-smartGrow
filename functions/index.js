const functions = require('firebase-functions');
var admin = require("firebase-admin");
const moment = require('moment');

var serviceAccount = require("./agroFireBaseAdmin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://agromation-grow-room-control.firebaseio.com"
});

const db = admin.firestore();

//Takes a uid and sets that UID with the account type User
exports.SetAccountUser = functions.https.onCall(async (data, context) => {
    if (context.auth.token.accountType === "admin" || context.auth.token.accountType === "owner") {
        try {
            let res = await admin.auth().setCustomUserClaims(data.uid, { accountType: "user", stripeRole: context.auth.token.stripeRole })
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

//Takes a uid and sets that UID with the account type Owner
exports.SetAccountOwner = functions.https.onCall(async (data, context) => {
    if (context.auth.token.accountType === "admin") {
        try {
            let res = await admin.auth().setCustomUserClaims(data.uid, { accountType: "owner", stripeRole: context.auth.token.stripeRole })
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

//Takes a uid and sets that UID with the account type admin
exports.SetAccountAdmin = functions.https.onCall(async (data, context) => {
    functions.logger.log("giving " + data.uid + " the Admin account type", context.auth.uid);
    if (context.auth.token.accountType === "admin") {
        try {
            let res = await admin.auth().setCustomUserClaims(data.uid, { accountType: "admin", stripeRole: 'admin' })
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
            error: "Invalid Admin Access",
            type: context.auth.token.accountType
        })
    }


});


//takes the email and created an account
exports.CreateMangedAccount = functions.https.onCall(async (data, context) => {
    if (context.auth.token.accountType === "admin" || context.auth.token.accountType === "owner") {
        try {
            let res = await admin.auth().createUser({ email: data.email })
            return ({
                status: "success",
                auth: context.auth,
                authRes: res,
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
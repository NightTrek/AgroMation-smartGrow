const functions = require('firebase-functions');
const admin = require('firebase-admin');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const express = require('express');
const cors = require('cors');
// const sql = require('mssql');
// const {  db, } = require('./fireConfig');

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
app.post('/api/live12/:deviceId', (req, res) => {

    res.send(Widgets.getById(req.params.id))
});

app.post('/', (req, res) => {
    // Verify the ID token first.AddManagedUser
    res.send({
        error: "No UID present in request",
        req: req
    })

    admin
        .auth()
        .verifyIdToken(idToken)
        .then((claims) => {
            console.log(claims)
            if (claims.admin === true || claims.owner === true) {
                // Allow access to requested admin resource.
                admin
                    .auth()
                    .setCustomUserClaims(req.uid, { admin: true })
                    .then(() => {
                        // The new custom claims will propagate to the user's ID token the
                        // next time a new one is issued.
                        res.send({
                            status:"success"
                        })
                    }).catch((err) => {
                        res.send({
                            error: err,
                            UID: req.UID
                        })
                    });
            }
        });
   


});


// app.post('/', (req, res) => res.send(Widgets.create()));
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
// app.get('/', (req, res) => res.send(Widgets.list()));

// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);
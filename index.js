const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const app = express();

var serviceAccount = require("../key/admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://spitel-office.firebaseio.com"
});
const db = admin.firestore();

const firebaseConfig = {
    apiKey: "AIzaSyDtjNguBz40536vtYMrBXLgyhqbX0_rJD0",
    authDomain: "spitel-office.firebaseapp.com",
    databaseURL: "https://spitel-office.firebaseio.com",
    projectId: "spitel-office",
    storageBucket: "spitel-office.appspot.com",
    messagingSenderId: "365732955095",
    appId: "1:365732955095:web:163730f3500e8650bf0192",
    measurementId: "G-3PLNJLSVDH"
  };
const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);






app.post('/jobs', (req, res) => {
    let jobs = {
        businessUnit: req.body.businessUnit,
        client: req.body.client,
        jobName: req.body.jobName,
        service: req.body.service,
        startDate: req.body.startDate,
        dueDate: req.body.dueDate,
        freelancer: req.body.freelancer,
        costToClient: req.body.costToClient,
        freelancerCost: req.body.freelancerCost,
        comments: req.body.comments,
        status: req.body.status,
        clientPayment: req.body.clientPayment,
        freelancerPayment: req.body.freelancerPayment,
        
    }
    db.collection('jobDetails').doc(req.body.client).set(jobs).then(() => {
        return db.collection('jobDetails').orderBy('desc').get().then(data => {
            let jobs = {};
            data.forEach(doc => {
                jobs.jobId = doc.id;
                jobs = doc.data();
            })
        })
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
const router = require("express").Router();
const db = require("../../models");

const admin = require('firebase-admin');
const firebase = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://simfba-interface.firebaseio.com'
});

// the route api/rosters is being disabled because there are 25000 players, so its too much overhead to retrieve all players unfiltered.
// router.get("/rosters", function(req, res) {
//     // Temporary Headers -- due to running on different ports in dev environments
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     console.log("rosters route hit");
//     db.Player.findAll({}).then((players) => {
//         res.status(200).send(players);
//     });
// });

router.get("/roster/:teamId", function (req, res) {
    console.log("headers for roster request:", req.headers);
    // console.log("roster route hit");
    // console.log("for teamId:", req.params.teamId);
    
    // admin.auth().verifyIdToken(idToken)
    //     .then(function (decodedToken) {
    //         let uid = decodedToken.uid;
    //         // ...
    //     }).catch(function (error) {
    //         // Handle error
    //     });

    res.header('Access-Control-Allow-Origin', 'localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    db.Player.findAll({
        where: {
            team: req.params.teamId
        }
    }).then((rosters) => {
        res.status(200).send(rosters);
    });
});


module.exports = router;
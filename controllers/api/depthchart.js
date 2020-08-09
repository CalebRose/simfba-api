const router = require("express").Router();
const db = require("../../models");
const { QueryTypes } = require('sequelize');

const admin = require('firebase-admin');

router.get("/depthchart/:teamId", function(req, res) {
    const getDepthCharts = async () => {
        const dc = await db.sequelize.query(
            `select * from database_development.depthcharts dc where dc.playerId in (select p.id from database_development.players p where p.Team = ${req.params.teamId})`,
            { type: QueryTypes.SELECT
        });
        // res.header('Access-Control-Allow-Origin', '*');
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // res.header('Access-Control-Allow-Headers', 'Content-Type');
        if (dc) {
            res.status(200).send(dc);
        } else {
            res.status(400);
        }

    }
    admin.auth().verifyIdToken(idToken)
    .then(function (decodedToken) {
        const uid = decodedToken.uid;
        console.log("Token decoded");
        console.log("uid:");
        console.log(uid);
        // res.header('Access-Control-Allow-Origin', 'localhost:3000');
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // res.header('Access-Control-Allow-Headers', 'Content-Type');
        getDepthCharts();
    }).catch(function (error) {
        // Handle error
        console.log("Token NOT decoded. Something went wrong. Sending 403.");
        res.status(403);
    });
});

router.post("/depthchart/:teamId", function(req, res) {
    console.log("depthchart post route hit for team: ", req.params.teamId);
    const playerId = req.body.playerId;
    const starting = req.body.starting;
    if (playerId && starting) { 
        // console.log("playerId: ", playerId);
        // console.log("starting: ", starting);
        res.status(200).send();
    } else {
        console.log("required values missing.");
        res.status(400).send();
    }
});


module.exports = router;
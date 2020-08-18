const router = require("express").Router();
const db = require("../../models");
const { QueryTypes } = require('sequelize');

const admin = require('firebase-admin');

router.get("/depthchart/:teamId", function(req, res) {
    const idToken = req.headers.authorization.replace('Bearer ', '');
    const getDepthCharts = async () => {
        const dc = await db.sequelize.query(
            // `select * from database_development.depthcharts dc where dc.playerId in (select p.id from database_development.players p where p.Team = ${req.params.teamId})`,
            `select
            p.First_Name, p.Last_Name, p.Position, 
            p.Archetype, p.Overall, p.Height, 
            p.Weight, p.Carrying, p.Agility, 
            p.Catching, p.Zone_Coverage, p.Man_Coverage,
            p.Football_IQ, p.Kick_Accuracy, p.Kick_Power,
            p.Pass_Block, p.Pass_Rush, p.Punt_Accuracy,
            p.Punt_Power, p.Route_Running, p.Run_Block,
            p.Run_Defense, p.Speed, p.Strength,
            p.Tackle, p.Throw_Power, p.Throw_Accuracy,
            p.Injury, p.Stamina, p.Discipline,
            p.Progression, p.Potential, p.Year
            from Depthcharts dc INNER JOIN Players p on p.id = dc.playerId where p.Team = ${req.params.teamId};`,
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
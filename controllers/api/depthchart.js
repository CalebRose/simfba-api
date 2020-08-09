const router = require("express").Router();
const db = require("../../models");
const { QueryTypes } = require('sequelize');

router.get("/depthchart/:teamId", function(req, res) {
    const getDepthCharts = async () => {
        const dc = await db.sequelize.query(
            `select * from database_development.depthcharts dc where dc.playerId in (select p.id from database_development.players p where p.Team = ${req.params.teamId})`,
            { type: QueryTypes.SELECT
        });
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).send(dc);

    }
    getDepthCharts();
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
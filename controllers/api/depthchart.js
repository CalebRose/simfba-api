const router = require("express").Router();
const db = require("../../models");
const { QueryTypes } = require('sequelize');

router.get("/depthchart/:teamId", function(req, res) {
    // console.log("depthchart route hit for team: ", req.params.teamId);
    
    // db.Players.findAll({
    //     where: {
    //       team: req.params.teamId
    //     }
    // }).then((depthchart) => {
    //     res.status(200).send(depthchart); // this really needs to perform a join query on players table to return the players
    // });

    // db.Player.findAll({
    //     where: {
    //       team: req.params.teamId
    //     }
    // }).then((rosters) => {
    //     res.status(200).send(rosters);
    // });
    const getDepthCharts = async () => {
        const dc = await db.sequelize.query(`select * from database_development.depthcharts dc where dc.playerId in (select p.id from database_development.players p where p.Team = ${req.params.teamId})`, { type: QueryTypes.SELECT });
        // console.log("depth charts:");
        // console.log(dc);
        res.status(200).send(dc);

    }
    getDepthCharts();


    // return db.query(
    //     'select * from database_development.depthcharts dc where dc.playerId in (select p.id from database_development.players p where p.Team = 1)'
    // );

    // db.Depthchart.findAll({
    //     attributes: db.sequelize.literal('select * from database_development.depthcharts dc where dc.playerId in (select p.id from database_development.players p where p.Team = 1)').then((depthchart) => {
    //         res.status(200).send(depthchart);
    //     })
    // });

    // db.Depthchart.findAll({
    //     attributes: {
    //         include: [
    //             [
    //                 // Note the wrapping parentheses in the call below!
    //                 db.sequelize.literal(`(
    //                     SELECT COUNT(*)
    //                     FROM reactions AS reaction
    //                     WHERE
    //                         reaction.postId = post.id
    //                         AND
    //                         reaction.type = "Laugh"
    //                 )`),
    //                 'laughReactionsCount'
    //             ]
    //         ]
    //     }
    // });

});

router.post("/depthchart/:teamId", function(req, res) {
    console.log("depthchart post route hit for team: ", req.params.teamId);
    const playerId = req.body.playerId;
    const starting = req.body.starting;
    if (playerId && starting) { 
        console.log("playerId: ", playerId);
        console.log("starting: ", starting);
        res.status(200).send();
    } else {
        console.log("required values missing.");
        res.status(400).send();
    }
});


module.exports = router;
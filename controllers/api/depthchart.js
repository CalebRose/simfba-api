const router = require("express").Router();
// const db = require("../../models");

router.get("/depthchart/:teamId", function(req, res) {
    console.log("depthchart route hit for team: ", req.params.teamId);
    res.status(200).send();
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
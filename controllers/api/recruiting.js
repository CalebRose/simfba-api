const router = require("express").Router();
// const db = require("../../models");

router.get("/recruiting/:teamId", function(req, res) {
    console.log("recruiting route hit for team: ", req.params.teamId);
    res.status(200).send();
});

router.post("/recruiting/:teamId", function(req, res) {
    console.log("recruiting post route hit for team: ", req.params.teamId);
    const playerId = req.body.playerId;
    const points = req.body.points;
    if (playerId && points) { 
        console.log("playerId: ", playerId);
        console.log("points: ", points);
        res.status(200).send();
    } else {
        console.log("required values missing.");
        res.status(400).send();
    }
});

router.get("/recruiting/offers/:teamId", function(req, res) {
    console.log("recruiting offers GET route hit for team: ", req.params.teamId);
    res.status(200).send();
});

router.put("/recruiting/:offerId/:teamId", function(req, res) {
    console.log("recruiting offers PUT route hit for team: ", req.params.teamId, " and offer: ", req.params.offerId);
    const points = req.body.points;
    if (points) {
        console.log("new point value: ", points);
        res.status(200).send();
    } else {
        console.log("required values missing.");
        res.status(400).send();
    }
});

router.delete("/recruiting/:offerId/:teamId", function(req, res) {
    console.log("recruiting offers DELETE route hit for team: ", req.params.teamId, " and offer: ", req.params.offerId);
    res.status(200).send();
});



module.exports = router;
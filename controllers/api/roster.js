const router = require("express").Router();
const db = require("../../models");

router.get("/rosters", function(req, res) {
    console.log("rosters route hit");
    db.Player.findAll({}).then((players) => {
        res.status(200).send(players);
    });
});

router.get("/roster/:teamId", function(req, res) {
    console.log("roster route hit");
    console.log("for teamId:", req.params.teamId);
    db.Roster.findOne({
        where: {
          team: req.params.teamId
        }
    }).then((rosters) => {
        res.status(200).send(rosters);
    });
});


module.exports = router;
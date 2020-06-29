const router = require("express").Router();
// const db = require("../../models");

router.get("/rosters", function(req, res) {
    console.log("rosters route hit");
    res.status(200).send();
});

router.get("/roster", function(req, res) {
    console.log("roster route hit");
    res.status(200).send();
});


module.exports = router;
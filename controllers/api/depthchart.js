const router = require("express").Router();
// const db = require("../../models");

router.get("/depthchart", function(req, res) {
    console.log("depthchart route hit");
    res.status(200).send();
});


module.exports = router;
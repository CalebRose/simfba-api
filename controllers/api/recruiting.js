const router = require("express").Router();
// const db = require("../../models");

router.get("/recruiting", function(req, res) {
    console.log("recruiting route hit");
    res.status(200).send();
});


module.exports = router;
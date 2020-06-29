const router = require("express").Router();
// const db = require("../../models");

const rosterRoutes = require("./roster");
const depthchartRoutes = require("./depthchart");
const recruitingRoutes = require("./recruiting");

router.use(rosterRoutes);
router.use(depthchartRoutes);
router.use(recruitingRoutes);

module.exports = router;
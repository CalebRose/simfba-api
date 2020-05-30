const express = require("express");
const db = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("Listening on port %s", PORT);
    });
});
const express = require("express");
const routes = require("./controllers");
const db = require("./models");

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
      console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
    });
});
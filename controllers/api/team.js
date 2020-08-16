const router = require('express').Router();
const db = require('../../models');
// const { QueryTypes } = require('sequelize');

const admin = require('firebase-admin');

router.get('/teams', function (req, res) {
  db.Team.findAll({}).then((teams) => {
    res.status(200).send(teams);
  });

  const idToken = req.headers.authorization.replace('Bearer ', '');
  console.log(idToken, 'idToken');

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
      const uid = decodedToken.uid;
      console.log('Token decoded');
      console.log('uid:');
      console.log(uid);
      // res.header('Access-Control-Allow-Origin', 'localhost:5000');
      // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      db.Team.findAll({}).then((teams) => {
        res.status(200).send(teams);
      });
    })
    .catch(function (error) {
      // Handle error
      console.log('Token NOT decoded. Something went wrong. Sending 403.');
      res.status(403);
    });
});

module.exports = router;

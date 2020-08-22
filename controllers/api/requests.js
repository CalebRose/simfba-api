const router = require('express').Router();
const db = require('../../models');

const admin = require('firebase-admin');

router.post('/request/:teamId/:username', function (req, res) {
  const idToken = req.headers.authorization.replace('Bearer ', '');
  const user = req.body.username;
  const team = req.body.teamId;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
      // res.header('Access-Control-Allow-Origin', '*');
      // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      // res.header('Access-Control-Allow-Headers', 'Content-Type');
      const uid = decodedToken.uid;
      console.log('Token decoded');
      console.log('uid:');
      console.log(uid);
      await db.requests.create({ teamId: team, user: user, isApproved: false });
    })
    .then((request) => {
      res.status(200).send(request);
    });
});

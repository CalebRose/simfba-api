const router = require('express').Router();
const db = require('../../models');

const admin = require('firebase-admin');

router.post('/request/:teamId', function (req, res) {
  const idToken = req.headers.authorization.replace('Bearer ', '');
  const user = req.body.username;
  const team = req.body.teamId;
  console.log(user);
  console.log(team);

  const setRequest = async () => {
    //
    await db.Request.create({
      TeamId: team,
      User: user,
      IsApproved: false,
    });
  };

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

      setRequest();
    })
    .then((request) => {
      res.status(200).send(request);
    });
});

module.exports = router;

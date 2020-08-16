const router = require('express').Router();
const db = require('../../models');

const admin = require('firebase-admin');

// the route api/rosters is being disabled because there are 25000 players, so its too much overhead to retrieve all players unfiltered.
// router.get("/rosters", function(req, res) {
//     // Temporary Headers -- due to running on different ports in dev environments
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     console.log("rosters route hit");
//     db.Player.findAll({}).then((players) => {
//         res.status(200).send(players);
//     });
// });

router.get('/roster/:teamId', function (req, res) {
  const idToken = req.headers.authorization.replace('Bearer ', '');
  console.log(idToken, 'idToken');
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

      db.Player.findAll({
        where: {
          team: req.params.teamId,
        },
      }).then((rosters) => {
        res.status(200).send(rosters);
      });
    })
    .catch(function (error) {
      // Handle error
      console.log('Token NOT decoded. Something went wrong. Sending 403.');
      res.status(403);
    });
});

module.exports = router;

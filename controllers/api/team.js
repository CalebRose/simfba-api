const router = require('express').Router();
const db = require('../../models');
// const { QueryTypes } = require('sequelize');

const admin = require('firebase-admin');
const { QueryTypes, Op } = require('sequelize');

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

router.get('/teams/coachedTeams', function(req,res) {
  db.Team.findAll({where: {
    Coach: {
      [Op.not]: null
    }
  }}).then((teams) => {
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
    // res.header('Access-Control-Allow-Origin', 'localhost:3001');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    db.Team.findAll({where: {
      Coach: {
        [Op.not]: null
      }
    }}).then((teams) => {
      res.status(200).send(teams);
    });
  })
  .catch(function (error) {
    // Handle error
    console.log('Token NOT decoded. Something went wrong. Sending 403.');
    res.status(403);
  });
})

router.post('/teams/assign/:teamId', function (req, res) {
  const idToken = req.headers.authorization.replace('Bearer ', '');
  console.log(req.body);
  const teamId = req.body.teamId;
  const user = req.body.username;

  const approveRequest = async () => {
    const queryStr = `UPDATE teams 
                      SET Coach =  "${user}"
                      WHERE id = ${teamId};`;
    const approval = await db.sequelize.query(queryStr, {
      type: QueryTypes.UPDATE,
    });
    db.sequelize.sync({ force: false }).then(() => {
      if (approval) {
        res.status(200).send(approval);
      } else {
        // this should never happen.
        res.status(400).send({});
      }
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

      approveRequest();
    })
    .then((request) => {
      res.status(200).send(request);
    })
    .catch(function (error) {
      // Handle error
      console.log('Token NOT decoded. Something went wrong. Sending 403.');
      res.status(403);
    });
});

module.exports = router;

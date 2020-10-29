const router = require('express').Router();
const db = require('../../models');
const admin = require('firebase-admin');
const { QueryTypes } = require('sequelize');

router.post('/request/:teamId', function (req, res) {
  const idToken = req.headers.authorization.replace('Bearer ', '');
  const user = req.body.username;
  const team = req.body.teamId;

  const setRequest = async () => {
    //
    await db.Request.create({
      TeamId: team,
      Username: user,
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

router.get('/requests', function (req, res) {
  const idToken = req.headers.authorization.replace('Bearer ', '');
  const getRequests = async () => {
    const requests = await db.sequelize.query(
      `select r.id, r.TeamId, t.Team, t.Nickname, t.Abbr, t.Current_Conference, r.Username, r.IsApproved
      from requests r
      inner join teams t on r.TeamId = t.id
      where IsApproved = 0;`,
      { type: QueryTypes.SELECT }
    );

    if (requests) {
      res.status(200).send(requests);
    } else {
      res.status(400).send({});
    }
  };

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
      const uid = decodedToken.uid;
      console.log('Token decoded');
      console.log('uid:');
      console.log(uid);

      getRequests();
    })
    .catch(function (error) {
      console.log('Token NOT decoded. Something went wrong. Sending 403.');
      res.status(403);
    });
});

router.post('/requests/approve/:reqId', function (req, res) {
  const idToken = req.headers.authorization.replace('Bearer ', '');
  console.log(req.body);
  const requestId = req.body.reqId;

  const approveRequest = async () => {
    const queryStr = `UPDATE requests 
                      SET IsApproved = 1 
                      WHERE id = ${requestId};`;
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

router.post('/requests/revoke/:reqId', function (req, res) {
  const idToken = req.headers.authorization.replace('Bearer ', '');
  const requestId = req.body.reqId;

  const revokeRequest = async () => {
    const queryStr = `UPDATE teams 
                      SET Coach = Null 
                      WHERE id = ${requestId};`;
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

      revokeRequest();
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

router.delete('/request/reject', function (req, res) {
  const idToken = req.headers.authorization.replace('Bearer ', '');
  const reqId = req.body.reqId;

  const rejectRequest = async () => {
    const queryStr = `DELETE from requests where id = ${reqId}`;
    return await db.sequelize.query(queryStr, { type: QueryTypes.UPDATE });
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

      const reject = rejectRequest();
      db.sequelize.sync({ force: false }).then(() => {
        if (reject) {
          res.status(200).send(reject);
        } else {
          // this should never happen.
          res.status(400).send({});
        }
      });
    })
    .then((request) => {
      res.status(200).send(request);
    })
    .catch(function (error) {
      // Handle error
      console.log('Token NOT decoded. Something went wrong. Sending 403.');
      console.log(error);
      res.status(403);
    });
});
module.exports = router;

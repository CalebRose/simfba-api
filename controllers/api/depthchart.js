const router = require('express').Router();
const db = require('../../models');
const { QueryTypes } = require('sequelize');

const admin = require('firebase-admin');

router.get('/depthchart/:teamId', function (req, res) {
  const idToken = req.headers.authorization.replace('Bearer ', '');
  const getDepthCharts = async () => {
    const dc = await db.sequelize.query(
      // `select * from database_development.depthcharts dc where dc.playerId in (select p.id from database_development.players p where p.Team = ${req.params.teamId})`,
      `select
            dc.positionId, dc.playerId, dc.startingTernary, 
            p.First_Name, p.Last_Name, p.Position, 
            p.Archetype, p.Overall, p.Height, 
            p.Weight, p.Carrying, p.Agility, 
            p.Catching, p.Zone_Coverage, p.Man_Coverage,
            p.Football_IQ, p.Kick_Accuracy, p.Kick_Power,
            p.Pass_Block, p.Pass_Rush, p.Punt_Accuracy,
            p.Punt_Power, p.Route_Running, p.Run_Block,
            p.Run_Defense, p.Speed, p.Strength,
            p.Tackle, p.Throw_Power, p.Throw_Accuracy,
            p.Injury, p.Stamina, p.Discipline,
            p.Progression, p.Potential, p.Year
            from Depthcharts dc INNER JOIN Players p on p.id = dc.playerId where p.Team = ${req.params.teamId};`,
      { type: QueryTypes.SELECT }
    );
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (dc) {
      res.status(200).send(dc);
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
      // res.header('Access-Control-Allow-Origin', 'localhost:3000');
      // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      // res.header('Access-Control-Allow-Headers', 'Content-Type');
      getDepthCharts();
    })
    .catch(function (error) {
      // Handle error
      console.log('Token NOT decoded. Something went wrong. Sending 403.');
      res.status(403);
    });
});

router.post('/depthchart/:teamId', function (req, res) {
  // console.log('depthchart post route hit for team: ', req.params.teamId);
  const idToken = req.headers.authorization.replace('Bearer ', '');
  const arr = req.body;
  const resArr = [];

  const postDepthChartUpdates = async (queryString) => {
    return await db.sequelize.query(queryString, { type: QueryTypes.UPDATE });
  }

  const postDCUpdates = async () => {
    if (arr.length > 0) {
      await arr.map(async (x, index) => {
        const queryStr = `UPDATE Depthcharts SET startingTernary = ${x.startingTernary} where playerId = ${x.playerId};`;
        resArr[index] = await postDepthChartUpdates(queryStr);
        
      });
    
      db.sequelize.sync({ force: false }).then(() => {
        if (resArr.length > 0) {
          res.status(200).send(resArr);
        } else { // this should never happen.
          res.status(400).send({});
        }
      });
    } else {
      res.status(200).send([]);
    }
}

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(function (decodedToken) {
      const uid = decodedToken.uid;
      console.log('Token decoded');
      console.log('uid:');
      console.log(uid);
      // res.header('Access-Control-Allow-Origin', 'localhost:3000');
      // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      // res.header('Access-Control-Allow-Headers', 'Content-Type');
      postDCUpdates();
    })
    .catch(function (error) {
      // Handle error
      console.log('Token NOT decoded. Something went wrong. Sending 403.');
      res.status(403);
    });
});

module.exports = router;

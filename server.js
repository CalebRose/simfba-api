const path = require('path');
const express = require('express');
const routes = require('./controllers');
const db = require('./models');

const admin = require('firebase-admin');
const serviceAccount = require('./config/service-account-file.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://simfba-interface.firebaseio.com',
});

const PORT = process.env.PORT || 3001;
const app = express();

// const admin = require('firebase-admin');
// const firebase = admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://simfba-interface.firebaseio.com'
// });

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('client/simfba-interface/public'));
app.use(express.json());

app.use(routes);

app.get('/:reqStr', function (req, res) {
  res.sendFile(
    path.resolve(
      __dirname,
      'client/simfba-interface/public/' + req.params.reqStr
    )
  );
});

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// db.sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
//   });
// });

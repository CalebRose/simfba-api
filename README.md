# simfba-api

##

To use first clone the repo and then run `npm install` to install all dependencies.

Don't forget to supply the needed configuration files in the /config folder for your Sequelize MySQL connection (this is in config/config.json) as well as your credentials for your firebase service account to the firebase cloud DB used to authenticate users of this application. The firebase credentials should be in a file called service-account-file.json.

After this, perform the following steps:

1. (Optional) Delete the models/ folder.
2. Type `npm run seed` to re-create the Sequelize model description files from the CSV files in the data/ folder.
3. Type `npm start` to start the api server and drop / create tables from the model files.
4. In another PowerShell window, type `npm run seed` again in order to seed (i.e., populate) the database tables.

Now the API server is running on your localhost port 3001 and the UI can be accessed at the root (/) location.

Note that the secure API routes require a firebase JWT token to be passed in via a request header property with the key name "Authorization." You can only get this token by loggin into the UI with a valid user account.

## API Server Routes

These routes need to be updated to match what is in Swagger.

```
router.get("/admin/requests", function(req, res) {...})
router.post("/admin/request/:request_id", function(req, res) {...})

router.post("/request/:team_id", function(req, res) {...})

router.get("/roster/all",                  function(req, res) {...})
router.get("/roster/:team_id",         function(req, res) {...})
router.post("/roster/update",           function(req, res) {...})

router.get("/depthchart",                  function(req, res) {...})
router.post("/depthchart/update",           function(req, res) {...})

router.get("/recruiting",                  function(req, res) {...})
router.post("/recruiting/update",           function(req, res) {...})

router.get("/schedule",                  function(req, res) {...})
router.post("/schedule/update",           function(req, res) {...})
```
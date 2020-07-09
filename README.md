# simfba-api

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

To compile TS scripts, use:
`npm run ts`

This will compile all .ts files in the scripts/ts folder into .js scripts in the scripts/js folder.

To generate seed files from svg files in the /data folder, use `node ./scripts/js/seedobjectGenerator.js`. This will output one seed file in the /seeders folder for every .csv file in the data folder. This command may be replaced with a npm script eventually.

Name the csv files after the table the data is meant to be inserted into.

After generating the seed files, you can then seed the database by using `sequelize db:seed:all`

Note that you may want clear the DB out prior to seeding. One way to do that is to start the server, because it is set to drop the database tables and recreate them.

Next steps: generate sequelize models automatically.
# simfba-api

## API Server Routes

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
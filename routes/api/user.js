var express = require('express');
var router = express.Router();

/* GET /api/current-user. */
router.get('/current-user', function(req, res, next) {
  res.json(req.user)
});

module.exports = router;

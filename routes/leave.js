var express = require('express');
var router = express.Router();
var auth = require('../auth/auth')
/* GET users listing. */
router.get('/', auth, function(req, res, next) {
  res.render('leave');
});

module.exports = router;

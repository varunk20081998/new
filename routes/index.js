var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Our School',
  name:'Tata schools pvt. ltd.'
});
});

module.exports = router;

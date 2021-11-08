const { ObjectId } = require('bson');
var express = require('express');
var router = express.Router();
require('mongoose')
var User = require('../models/users')
var auth = require('../auth/auth')
/* GET users listing. */
router.get('/',auth, function(req, res, next) {
 
  User.find().then(data=>{
    //res.send(user)
   
    res.render('view-marks',{title: 'View Student marks here', data })
  }).catch(err=>{
    res.status(500)
  })
  
});

module.exports = router;

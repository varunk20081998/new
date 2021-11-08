var express = require('express');
var router = express.Router();
var User = require('../models/users')
require('../db/mongoose')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Our School',
  name:'varun'
});
});

router.post('/',  async (req,res)=>{
  if(req.body.password === req.body.cpassword){
    try{
      const user = new User(req.body)
    user.save().then(()=>{
      res.render('signin',{ message1:'**you have successfuly signed up try to signin**'})
    }).catch((e) => {
      res.status(500).render('signup',{error:"**ussername/email is taken please try with another username/mail**"})
      })
  
    }
    catch(err){
      res.render('error',{message:"unable to process",status:"400"});
  
    }
    
  }

  else{
    res.render('signup',{error:'**Your password is not amtching with confirm password**'})
  }

  
 console.log(req.body);
  
})




module.exports = router;

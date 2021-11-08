
var express = require('express');
const { Error } = require('mongoose');
var router = express.Router();
const User = require('../models/users');
const Teacher = require('../models/teachers')
require('../db/mongoose')




router.get('/', function(req, res, next) {
  res.render('signin', { title: 'Our School',name:'varun'});
  console.log(req.session);
});

router.post('/', async (req,res)=>{
  if(req.body.person==='teacher'){
   
      try{
      const teacher = await Teacher.findByCredentialsTea( req.body.username, req.body.password )
      // console.log(teacher);
      req.session.isAuth=true
       res.render('teacher-home',{title: teacher.username})
    }
    catch(e){
      
      res.render('signin',{message:"**unable to login invalid credentials**"});
     
    }
    
    
    

  }else if(req.body.person==='student'){
    try{
      const user = await User.findByCredentials( req.body.username, req.body.password )
      // console.log(user);
       req.session.isAuth=true
      res.render('home',{title:user.name, user})
      req.session.isAuth=false
    }
    catch(e){
      
      res.render('signin',{message:"**unable to login invalid credentials**"});
     
    }
  }else{
    res.render('signin',{message:"**Select either teacher or student**"});
  }
  
  
  //console.log(req.session);

})



module.exports = router;

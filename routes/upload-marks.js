const { ObjectId } = require('bson');
var express = require('express');
var router = express.Router();
require('mongoose')
var User = require('../models/users')
var auth = require('../auth/auth')

/* GET users listing. */
router.get('/', auth, function(req, res, next) {
 
  User.find().then(user=>{
    //res.send(user)
   
    res.render('upload-marks',{title: 'Upload Student marks here', user })
  }).catch(err=>{
    res.status(500)
  })
  
});

router.post('/',async (req,res)=>{
   try{
      
     for(var i=0;i<req.body.rollno.length;i++){     
      
      if(req.body.maths[i]<10 && req.body.maths[i]>'2' ||req.body.maths[i]==='1'||req.body.maths[i]==='2'){
         var maths;
         maths='0'+ req.body.maths[i];
         User.updateOne({rollno:req.body.rollno[i]},{$set: { maths:maths}} ).then(()=>{
        }).catch(e=>{res.send('not posted')})
       }else{
        User.updateOne({rollno:req.body.rollno[i]},{$set: { maths:req.body.maths[i]}} ).then(()=>{
        }).catch(e=>{res.send('not posted')})
       }
          

      
      }

      for(var j=0;j<req.body.rollno.length;j++){

        if(req.body.science[j]<10 && req.body.science[j]>'3'||req.body.science[j]==='1'||req.body.science[j]==='2'){
         var science;
         science='0'+ req.body.science[j];
         User.updateOne({rollno:req.body.rollno[j]},{$set: { science:science}} ).then(()=>{
        }).catch(e=>{res.send('not posted')})
       }else{
        User.updateOne({rollno:req.body.rollno[j]},{$set: { science:req.body.science[j]}} ).then(()=>{
        }).catch(e=>{res.send('not posted')})
       }
       }
      
       

      
                
  }catch{
    res.send('random error')
  }
  res.render('teacher-home',{post:'**you have successfuly posted the data to check please click view-marks tab**'})
 
})


module.exports = router;

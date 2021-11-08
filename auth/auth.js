const session=require("express-session")
const MongoDBSession=require('connect-mongodb-session')(session)
const mongouri="mongodb://127.0.0.1:27017/test2"
const store=new MongoDBSession({
  uri:mongouri,
  collection:"mysession"
})



const isAuth=(req,res,next)=>{
  if(req.session.isAuth){
    req.session.isAuth=true
      next()

      
  }
  else{
      res.render('signin')
  }
}


module.exports = isAuth;
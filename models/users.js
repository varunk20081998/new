const mongoose = require('mongoose')
const validate= require('validator')
const bcrypt= require('bcryptjs')
const router = require('../routes')
const { restart } = require('nodemon')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    username:{
        index:{unique:true},
        type: String,
        required: true,

    },

    
    email:{
       
        index:{unique:true},
        type: String,
        required: true,
        trim: true,
        lowercase: true,
            validate(value){
            if(!validate.isEmail(value)){
                throw new Error ('email is invalid')
            }
        }       
    },

    password: {
        type: String,
        required : true
    },
    rollno:{
        type:Number,
        required : true,
        index:{unique:true}
    },
    address:{
        type:String
    },
    phone: {
        type: String
    },
    class:{
        type: String,
        required:true
    },
    maths:{},
    science:{}
})

userSchema.statics.findByCredentials = async (username, password)=>{

    const user = await User.findOne({ username })
    if(!user){
        throw new Error("unable to login")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error("unable to login")
    }
    
    return user;
    
}

//hash the plane text password before saving
userSchema.pre('save',async function(next){
    const user= this;
    if(user.isModified('password')){
        //console.log(user);
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


const User= mongoose.model('User', userSchema )


module.exports = User;
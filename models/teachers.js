const mongoose = require('mongoose')



const userSchema = new mongoose.Schema(
    {

        username:{
            index:{unique:true},
            type: String,
            required: true,
    
        },
        password: {
            type: String,
            required : true
        },

    }
)

userSchema.statics.findByCredentialsTea = async (username, password)=>{

    const teacher = await Teacher.findOne({ username })
    if(!teacher){
        throw new Error("unable to login")
    }

    
    return teacher;
    
}





const Teacher = mongoose.model('Teacher', userSchema )

const teach = new Teacher({
    'username':'teacher1',
    'password': '123'
})

// teach.save().then(()=>{
// console.log(teach);
// }).catch((e)=>{
// console.log(e);
// })

module.exports = Teacher;
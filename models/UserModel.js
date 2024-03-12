const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true, 
        lowercase:true, 
    },
    password:{
        type:String,
        required:true,
    },
    username:{
        type:String,
    }, 
    age:{
        type:Number,
    }
})


module.exports = mongoose.model("User", UserSchema);
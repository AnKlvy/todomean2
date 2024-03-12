const mongoose = require('mongoose')

const ReviewModel = new mongoose.Schema({
    
    name:{
        type:String,
        required:true, 
        lowercase:true, 
    },
    summary:{
        type:String,
        required:true,
    },
    space:{
        type:String,
    }, 
    description:{
        type:String,
    }
})


module.exports = mongoose.model("Review", ReviewModel);
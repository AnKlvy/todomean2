const mongoose = require('mongoose')


const RestourantSchema = new mongoose.Schema({
    address:[{
        building:String,
        street:String, 
        zipcode:String, 
    }],
    borough:{
        type:String,
        required:true,
    },
    cuisine:{
        type:String,
    }, 
    name:{
        type:String,
    }
})

module.exports = mongoose.model("Restourant", RestourantSchema);
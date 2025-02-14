const mongoose=require('mongoose');
const ServiceScema=new mongoose.Schema({
    
    servicename:{
        type:String,
        required:true
    },


    username:{
        type:String,
        required:true
    },
    emailid:{
        type:String,
        required:true
    
    },
    password:{
        type:String,
        required:true
    }

    })
    const service=mongoose.model('ser',ServiceScema);
        module.exports=service;
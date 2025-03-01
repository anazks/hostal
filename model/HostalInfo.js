const mongoose=require('mongoose');
const hostalInfo=new mongoose.Schema({
    
    roomType:{
        type:String,
        required:true
    },
    residents:{
        type:String,
        required:true
    },
    acStatus:{
        type:String,
        required:true
    },
    facilities :{
        type:String,
        required:true
    },
    hostalId :{
        type:String,
        required:true
    },
    })
    const hostalinfo=mongoose.model('hostalInfo',hostalInfo);
    module.exports=hostalinfo;
const mongoose=require('mongoose');
const hostelScema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }

    })
    const hostel=mongoose.model('hostel',hostelScema);
    module.exports=hostel;
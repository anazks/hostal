const mongoose=require('mongoose');
const foodservice=new mongoose.Schema({
    
    emailid:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    breakfast:{
        type:String,
        required:true
    },
    lunch:{
        type:String,
        required:true
    },
   
    dinner:{
        type:String,
        required:true
    },
    })
    const foodadd=mongoose.model('foodadd',foodservice);
    module.exports=foodadd;
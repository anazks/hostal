const mongoose=require('mongoose');
const FeedBack=new mongoose.Schema({
    
    user:{
        type:String,
        required:true
    },
   hosteId:{
    type:String,
    required:true
   },
   feedBack:{
    type:String,
    required:true
   }
    })
    const FeedBacks=mongoose.model('FeedBack',FeedBack);
    module.exports=FeedBacks;
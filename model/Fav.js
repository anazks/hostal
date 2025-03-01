const mongoose=require('mongoose');
const favScema=new mongoose.Schema({
    
    userID:{
        type:String,
        required:true
    },
   hostels:{
    type:Array,
    required:true
   }
    })
    const fav=mongoose.model('fav',favScema);
    module.exports=fav;
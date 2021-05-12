const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
   password:{
       type:String,
       required:true
   },
   skills:{
    type:String,    
    default:"none"
   }
});

const User = mongoose.model("User",userSchema);
module.exports = User;



const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
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
   role:{
    type:String,
    enum:["admin","user"],
    default:"user"
   }
});

const User = mongoose.model("User",userSchema);
module.exports = User;



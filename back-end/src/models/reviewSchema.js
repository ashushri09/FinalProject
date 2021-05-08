const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs")
const reviewSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true,
        // trim:true
    },
    name:{
        type: String,
        required:true,
        // trim:true
    },
    reviewMsg:{
        type: String,
        required:true,
        // trim:true
    },
});

const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;



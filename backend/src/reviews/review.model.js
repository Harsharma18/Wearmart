const mongoose = require("mongoose");
const reviewSchema  = new  mongoose.Schema({
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true,
    },
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Product",
    },
    
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
},{timestamps:true});
const Review = mongoose.model("Review",reviewSchema);
module.exports  = Review;

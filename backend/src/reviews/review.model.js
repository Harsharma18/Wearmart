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
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },
    
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default:[],
    }],
    dislikes: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default:[],
    }],
    
},{timestamps:true});
const Review = mongoose.model("Review",reviewSchema);
module.exports  = Review;

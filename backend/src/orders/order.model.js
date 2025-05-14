const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    orderId : String,
    email:{
        type:String,
        required:true,
    },
    amount : Number,
    items:[
        {
            itemId : {
                type:String,
                required:true,
            },
            quantity:{
                type:String,
                required:true,
            }
        }
    ],
    status:{
        type:String,
        enum:["pending","processing","shipped","completed"],
        default:"pending",
    }
})
const Order = mongoose.model("Order",orderSchema);
module.exports = Order;
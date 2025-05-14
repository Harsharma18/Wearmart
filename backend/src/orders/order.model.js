const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  orderId: String,
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  items: [
    {
      itemId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "completed"],
    default: "pending",
  },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

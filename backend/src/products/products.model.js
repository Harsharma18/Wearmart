const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: String,
    description: String,
    price: {
      type: Number,
      required: true,
    },
    oldPrice: Number,
    image: String,
    color: String,
    rating: {
      type: Number,
      default: 0,
    },
    brand: String,
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productsSchema);
module.exports = Product;

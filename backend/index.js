const express = require("express");
const app = express();
require('dotenv').config()
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
//middleware setup
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json({limit:'25mb'}));
app.use(express.urlencoded({limit:'25mb',extended:true}));
app.use(cookieParser());

main().then(()=>{
    console.log("mongo atlas  connected");
}).catch((err)=>{
    console.log(err);
})
async function main() {
    await mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  }
const port = process.env.PORT || 8080;
app.get("/",(req,res)=>{
    res.send("hello world");
})
const userRoute = require("./src/Users/user.routes");
const productRoute = require("./src/products/products.route");
const reviewRoute = require("./src/reviews/review.route");
const orderRoute = require("./src/orders/order.route");
const statRoutes = require("./src/stats/state.route");
app.use("/api/auth",userRoute);
app.use("/api/product",productRoute);
app.use("/api/review",reviewRoute);
app.use("/api/order",orderRoute);
app.use("/api/stat",statRoutes);
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
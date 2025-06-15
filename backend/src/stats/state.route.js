const express = require("express");
const router = express.Router();
const Usermodel = require("../Users/user.model");
const Ordermodel = require("../orders/order.model");
const Reviewmodel = require("../reviews/review.model");
const Productmodel = require("../products/products.model");

//user stats route
router.get("/userstats/:email", async (req, res) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }
  try {
    //sum of all orders
    const user = await Usermodel.findOne({ email: email });
    if (!user) return res.status(404).send({ message: "User not found" });
    const totalPaymentresult = await Ordermodel.aggregate([
      { $match: { email: email } }, //right side mail match with req.body and left side mail match with order model
      { $group: { _id: null, totalamount: { $sum: "$amount" } } },
    ]);
    // console.log("totalPayment Result",totalPaymentresult);
    const totalAmountPayment =
      totalPaymentresult.length > 0 ? totalPaymentresult[0].totalamount : 0;
      // console.log("totalpaymentamount",totalAmountPayment);
    //get totalReviews
    const totalReview = await Reviewmodel.countDocuments({ author: user._id });
    //total purchase product
    const productPurchase = await Ordermodel.distinct("items.itemId", {
      email: email,
    });
    const totalPurchaseProducts = productPurchase.length;
    // console.log("totalPurchase Products",totalPurchaseProducts);
    // console.log("tpp",totalPurchaseProducts);
    res.json({
      totalAmount: totalAmountPayment.toFixed(2),
      totalReview,
      totalPurchaseProducts,
    });
    
  } catch (err) {
    console.error("Error fetching user stats", err);
    res.status(500).send({ message: "Failed to fetch user stats" });
  }
});

//admin stats route
router.get("/adminstats", async (req, res) => {
  try {
    //calculate total order
    const totalorders = await Ordermodel.countDocuments();
    //calculate total product
    const totalProducts = await Productmodel.countDocuments();

    //calculate total review
    const totalReview = await Reviewmodel.countDocuments();
    //calculate total users
    const totalusers = await Usermodel.countDocuments();
    //calculate total earning
    const totalEarningResult = await Ordermodel.aggregate([
      {
        $group: {
          _id: null,
          totalEarning: { $sum: '$amount' },
        },
      },
    ]);
    const totalEarning =
      totalEarningResult.length > 0 ? totalEarningResult[0].totalEarning : 0;

    //calculate total earning in a month
    const totalEarningMonthlyResult = await Ordermodel.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          monthlyEarning: { $sum: "$amount" },
        },
      },
      {
        //Sort by year and month
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    const monthlyEarnings = totalEarningMonthlyResult.map((item) => ({
      month: item._id.month,
      year: item._id.year,
      earning: item.monthlyEarning,
    }));
    //send the aggregiate data
    res.status(200).json({
      totalProducts,
      totalReview,
      totalusers,
      totalorders,
      totalEarning,
      monthlyEarnings,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
});
module.exports = router;

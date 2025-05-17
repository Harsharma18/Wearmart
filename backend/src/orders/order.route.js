const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Add this
const Order = require("./order.model");
const router = express.Router();

//  CREATE CHECKOUT SESSION
router.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          images: [item.image],
        },
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`, 
      cancel_url: `http://localhost:5173/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error); 
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

//  CONFIRM PAYMENT AND SAVE ORDER
router.post("/confirm-payment", async (req, res) => {
  const { session_id } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

    const paymentIntentId = session.payment_intent.id;

    let order = await Order.findOne({ orderId: paymentIntentId });

    if (!order) {
      const lineItems = session.line_items.data.map((item) => ({
        itemId: item.price.product, 
        quantity: item.quantity,
      }));

      const amount = session.amount_total / 100;

      order = new Order({
        orderId: paymentIntentId,
        items: lineItems,
        amount: amount,
        email: session.customer_details.email,
        status:
          session.payment_intent.status === "succeeded" ? "pending" : "failed",
      });

      await order.save(); 
    } else {
      order.status =
        session.payment_intent.status === "succeeded" ? "pending" : "failed";
      await order.save(); 
    }

    res.json({ message: "Order processed", order });
  } catch (err) {
    console.error("Error confirming payment:", err); 
    res.status(500).json({ error: "Failed to confirm payment" });
  }
});

module.exports = router;

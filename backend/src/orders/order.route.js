const express = require("express");
const router = express.Router();
//checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;
  try {
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price*100),
         product_data:{
            name:item.name,
            image:[item.image],
         },
      },
      quantity:item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
           line_items:lineItems,
            mode: 'payment',
    success_url: `?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    res.json({id:session.id});
  } catch (err) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

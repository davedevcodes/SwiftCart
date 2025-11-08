const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'products.json'));
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const items = req.body.cartItems;

    const line_items = items.map(item => ({
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.title
        }
      },
      quantity: item.qty
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `http://localhost:3000/success.html`,
      cancel_url: `http://localhost:3000/cancel.html`,
    });

    res.json({ url: session.url });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Checkout failed" });
  }
});

app.listen(3000, () => console.log("Server running → http://localhost:3000"));

const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51L7jl5FzVl4wML1bJF3CzkPFlZiqhw2ZdE7avUE6DGOnp9qBJ9oPmVQ6uetrCzct8jzFU8WOxUQiDE34am570F0P00AqI3NmxK"
);


const app = express();

// middleware

app.use(express.json());
const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  },
};

app.options('*', cors(corsOptions));

// routes
app.get("/", (req, res) => {
  res.send("It works!");
});


app.post("/stripe/charge",cors(corsOptions), async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount * 100,
    currency: req.body.currency,
    source: req.body.token,
    receipt_email: req.body.email,
    description: 'Software development services',
    level3: {
      merchant_reference: 55823,
      customer_reference: 808080,
      shipping_address_zip: 94110,
      shipping_from_zip: 94117,
      shipping_amount: 0,
      line_items: [
        {
          product_code: 11234,
          product_description: 'First item',
          unit_cost: 1000,
          quantity: 1,
          tax_amount: 0,
          discount_amount: 0,
        },
        
      ],
    },
    automatic_payment_methods: {enabled: true},
  }, {
    stripeAccount: 'acct_1LjjqEEGkHmhCTOD',

  });
  console.log(paymentIntent);
  res.send(paymentIntent);
});


//listen
app.listen(process.env.PORT || 4000, () => console.log("Server running"));

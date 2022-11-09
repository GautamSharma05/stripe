const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51L7jl5FzVl4wML1bJF3CzkPFlZiqhw2ZdE7avUE6DGOnp9qBJ9oPmVQ6uetrCzct8jzFU8WOxUQiDE34am570F0P00AqI3NmxK"
);
const uuid = require("uuid");

const app = express();

// middleware

app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("It works!");
});

app.post("/create-account", async (req, res) => {
  const account = await stripe.accounts.create({ type: "standard" });
  res.send(account);
});

app.post("/stripe/charge", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount * 100,
    currency: req.body.currency,
    source: req.body.token,
    receipt_email: req.body.email,
    description: 'Software development services',
    customer:"Sentrien",
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
          unit_cost: 60,
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

// app.post("/stripe/charge", (req, res) => {
//   stripe.charges
//     .create(
//       {
//         amount: req.body.amount,
//         currency: req.body.currency,
//         source: req.body.token,

//         description: "My First Test Charge (created for API docs)",
//       },
//       {
//         stripeAccount: "acct_1LjjqEEGkHmhCTOD",
//       }
//     )
//     .then((charge) => {
//       console.log(charge);
//       res.status(200).json(charge);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send(err);
//     });
// });

// app.post("/stripe/charge", (req, res) => {

//   stripe.checkout.sessions
//     .create(
//       {
//         line_items: [
//           {
//             name: "Stainless Steel Water Bottle",
//             amount: req.body.amount * 100,
//             currency: req.body.currency,
//             // source: req.body.token,
//             quantity: 1,
//           },
//         ],
//         mode: "payment",
//         success_url: "http://localhost/",
//         cancel_url: "https://www.facebook.com/",
//       },
//       {
//         stripeAccount: "acct_1LjjqEEGkHmhCTOD",
//       }
//     )
//     .then((charge) => {

//       res.status(200).json({success:true,charge});
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send(err);
//     });
// });

//listen
app.listen(4000, () => console.log("Server running"));

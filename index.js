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

app.post("/stripe/charge", (req, res) => {
  console.log(req.body);
  stripe.checkout.sessions
    .create(
      {
        line_items: [
          {
            name: "Stainless Steel Water Bottle",
            amount: req.body.amount * 100,
            currency: req.body.currency,
            // source: req.body.token,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "https://www.google.com/",
        cancel_url: "https://www.facebook.com/",
      },
      {
        stripeAccount: "acct_1LjjqEEGkHmhCTOD",
      }
    )
    .then((charge) => {
      console.log(charge);
      res.status(200).json(charge);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

//listen
app.listen(4000, () => console.log("Server running"));

const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51LYUZbSEsdRHsUSgPxsGBccuckij4i6s8v0DVKBazgxQxaTztBapXPpjd6hZmEH44pm9FTzgL0xKpIfppc4tybyf00CXnlRZx1"
);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello to amazon");
});

// app.post("/payments/create", cors(), async (req, res) => {
//   const total = req.query.total;

//   console.log("payment request recieved for amount>>>", total);

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: total,
//       currency: "inr",
//     });
//     //ok created
//     res.status(201).send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.log("Error", error);
//     res.json({
//       message: "Payment failed",
//       success: false,
//     });
//   }
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Sever is listening on port 5000");
});

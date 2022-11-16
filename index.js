const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(
  "sk_test_51LYUZbSEsdRHsUSgPxsGBccuckij4i6s8v0DVKBazgxQxaTztBapXPpjd6hZmEH44pm9FTzgL0xKpIfppc4tybyf00CXnlRZx1"
);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/payments/create", cors(), async (req, res) => {
  const total = req.query.total;

  console.log("payment request recieved for amount>>>", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
    });
    //ok created
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }

  // let { amount, id } = req.body;
  // try {
  //   const payment = await stripe.paymentIntents.create({
  //     amount,
  //     currency: "inr",
  //     description: "Spatula company",
  //     payment_method: id,
  //     confirm: true,
  //   });
  //   console.log("Payment", payment);
  //   res.json({
  //     message: "Payment successful",
  //     success: true,
  //   });
  // } catch (error) {
  //   console.log("Error", error);
  //   res.json({
  //     message: "Payment failed",
  //     success: false,
  //   });
  // }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Sever is listening on port 5000");
});

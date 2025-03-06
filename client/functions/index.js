const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
// const admin = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");

// getting the stipe key
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
// enabling cross origin
app.use(cors({ origin: true }));
// to handle incase we recive json data on the server
app.use(express.json());

//handling requests
app.get("/", (req, res) => {
   res.status(200).json({ message: "succsess!" });
});

// now in the place or listing to a specific port we are handling that with firebase
exports.api = onRequest(app);

// app.post("/payment/create", (req, res) => {
//    const total = req.query.total;
//    if (total > 0) {
//       res.status(200).json({ message: `Payment received, ${total}` });
//    } else {
//       res.status(400).json({ error: "Invalid payment amount" });
//    }
// });

app.post("/payment/create", async (req, res) => {
   const total = parseInt(req.query.total);
   if (total > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
         amount: total,
         currency: "USD",
      });

      res.status(201).json({
         clientSecret: paymentIntent.client_secret,
      });
   } else {
      res.status(403).json({
         message: "total must be greater than 0",
      });
   }
});

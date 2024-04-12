const express = require("express");
const orderRouter = express.Router();

const { Orders } = require("../models");

orderRouter.use(express.json());

// Add orders to table
orderRouter.post("/placeOrder", (req, res) => {
  const { customerId, orderDetails, message } = req.body;
  console.log("Received request payload:", {
    customerId,
    orderDetails,
    message,
  });

  Orders.create({
    UserId: customerId,
    orderDetails: orderDetails,
    message: message,
  })
    .then((newOrder) => {
      res.status(201).json({ success: true, order: newOrder });
    })
    .catch((error) => {
      console.error("Error placing order:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    });
});

module.exports = orderRouter;

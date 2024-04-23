const express = require("express");
const previousOrderRouter = express.Router();
const { sequelize } = require("../models");

const { PreviousOrder } = require("../models");

previousOrderRouter.use(express.json());

// Add details to previous order table
previousOrderRouter.post("/placePreviousOrder", (req, res) => {
  const { previousOrderDetails } = req.body;

  // Serialize current order details into JSON format
  const currentOrderDetails = JSON.stringify(previousOrderDetails);

  PreviousOrder.create({ previousOrderDetails: currentOrderDetails })
    .then((newOrder) => {
      res.status(201).json({ success: true, order: newOrder });
    })
    .catch((error) => {
      console.error("Error placing previous order", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    });
});

// Get all previous order details
previousOrderRouter.get("/getPreviousOrders", (req, res) => {
  PreviousOrder.findAll()
    .then((previousOrder) => {
      res.status(200).json({ success: true, data: previousOrder });
    })
    .catch((error) => {
      console.error("Error fetching previous order details", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    });
});

// Get updatedAt date of all previous orders
previousOrderRouter.get("/getPreviousOrdersUpdatedAt", (req, res) => {
  PreviousOrder.findAll({
    attributes: [
      [sequelize.fn("date", sequelize.col("updatedAt")), "updatedAtDate"],
    ],
  })
    .then((updatedAtDates) => {
      res.status(200).json({ success: true, data: updatedAtDates });
    })
    .catch((error) => {
      console.error("Error fetching updatedAt dates of previous orders", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    });
});

module.exports = previousOrderRouter;

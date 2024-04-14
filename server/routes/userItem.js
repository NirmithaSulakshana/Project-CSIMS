const express = require("express");
const userItemRouter = express.Router();

const { UserItems } = require("../models");
const { truncate } = require("fs");
const { where } = require("sequelize");

userItemRouter.use(express.json());

//Add ordrer details respect user
userItemRouter.post("/updateUserItems", (req, res) => {
  const { customerId, orderDetails } = req.body;

  const promises = [];

  orderDetails.forEach((item) => {
    const promise = UserItems.findOne({
      where: {
        UserId: customerId,
        ItemId: item.itemId,
      },
    })
      .then((existingRecord) => {
        if (existingRecord) {
          return existingRecord.update({
            quantity: existingRecord.quantity + item.quantity,
          });
        } else {
          return UserItems.create({
            UserId: customerId,
            ItemId: item.itemId,
            quantity: item.quantity,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating UserItems", error);
        throw error;
      });
    promises.push(promise);
  });

  Promise.all(promises)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error("Error updating UserItems", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    });
});

//Get all userItem values
userItemRouter.get("/getAllUserItems", (req, res) => {
  UserItems.findAll()
    .then((userItems) => {
      res.status(200).json({ success: true, data: userItems });
    })
    .catch((error) => {
      console.error("Error fetching UserItems", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    });
});

//Delete all values in UserItem
userItemRouter.delete("/deleteAllUserItems", (req, res) => {
  UserItems.destroy({
    where: {},
    truncate: true,
  })
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((error) => {
      console.error("Error deleting UserItems", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    });
});

module.exports = userItemRouter;

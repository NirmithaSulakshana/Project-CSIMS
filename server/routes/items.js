const express = require("express");
const itemRouter = express.Router();
const { Op } = require("sequelize");

const { Items } = require("../models");

itemRouter.use(express.json());

//get all items
itemRouter.get("/getItems", (req, res) => {
  Items.findAll()
    .then((items) => {
      // Send the items as a JSON response
      res.status(200).json(items);
    })
    .catch((err) => {
      // Handle errors
      console.error("Error retrieving items:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//get single item
itemRouter.get("/getItems/:itemName", (req, res) => {
  const item = req.params.itemName;
  Items.findOne({ where: { itemName: item } })
    .then((item) => {
      if (!item) {
        // If no item is found, send a 404 response
        res.status(404).json({ message: "Item not found" });
        return;
      }
      // Send the item as a JSON response
      res.status(200).json(item);
    })
    .catch((err) => {
      // Handle errors
      console.error("Error retrieving item:", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

//add new items
itemRouter.post("/addItem", (req, res) => {
  console.log("Request body:", req.body);
  const {
    itemName,
    unitPrice,
    botnicalName,
    barcodeNumber,
    cooled,
    crushed,
    reacted,
  } = req.body;

  // Check if an item with the same botanicalName or barcodeNumber already exists
  Items.findOne({
    where: {
      [Op.or]: [{ botnicalName }, { barcodeNumber }],
    },
  })
    .then((existingItem) => {
      if (existingItem) {
        // If an item with the same botanicalName or barcodeNumber already exists, show an error
        return res.status(400).json({
          message:
            "Item with the same botanicalName or barcodeNumber already exists",
        });
      }

      // If no existing item, add the new item to the table
      return Items.create({
        itemName,
        unitPrice,
        botnicalName,
        barcodeNumber,
        cooled,
        crushed,
        reacted,
      });
    })
    .then((newItem) => {
      // Send the newly added item as a response
      res
        .status(201)
        .json({ message: "Item added successfully", item: newItem });
    })
    .catch((error) => {
      // Handle other errors
      console.error("Error adding item:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

// delete an item
itemRouter.delete("/deleteItem", (req, res) => {
  console.log("Request body:", req.body);
  const { itemName, barcodeNumber, botnicalName } = req.body;

  // Check if an item with the provided itemName, barcodeNumber, and botnicalName exists
  Items.findOne({
    where: {
      [Op.and]: [{ itemName }, { barcodeNumber }, { botnicalName }],
    },
  })
    .then((item) => {
      if (!item) {
        // If no item is found, show an error
        return res.status(404).json({ message: "Item not found" });
      }
      // If the item is found, delete it
      return item.destroy();
    })
    .then(() => {
      // Send success message
      res.status(200).json({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting items: ", err);
      res.status(500).json({ message: "Internal server error" });
    });
});

// Update item based on barcode number
itemRouter.patch("/updateItem/:barcodeNumber", (req, res) => {
  const barcodeNumber = req.params.barcodeNumber;
  const { itemName, unitPrice, botnicalName, cooled, crushed, reacted } =
    req.body;

  // Check if an item with the specified barcodeNumber exists
  Items.findOne({ where: { barcodeNumber } })
    .then((item) => {
      if (!item) {
        // If no item is found, show an error
        return res.status(404).json({ message: "Item not found" });
      }

      // Update the item's values
      return item.update({
        itemName,
        unitPrice,
        botnicalName,
        cooled,
        crushed,
        reacted,
      });
    })
    .then((updatedItem) => {
      // Send the updated item as a response
      res
        .status(200)
        .json({ message: "Item updated successfully", item: updatedItem });
    })
    .catch((error) => {
      // Handle errors
      console.error("Error updating item:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = itemRouter;

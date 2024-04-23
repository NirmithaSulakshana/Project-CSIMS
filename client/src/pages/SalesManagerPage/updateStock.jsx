import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AttachMoney, Exposure, Person, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  showErrorToast,
  showSuccessToast,
} from "../../components/ToasterMessage.jsx";
import { Item } from "rc-menu";

const UpdateStock = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    barcodeNumber: "",
    itemName: "",
    quantity: "",
    supplierPrice: "",
  });

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch all items from the backend when the component mounts
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/items/getItems"
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setFormData({
      barcodeNumber: item.barcodeNumber,
      itemName: item.itemName,
      quantity: item.quantity.toString(), // Convert quantity to string for TextField input
      supplierPrice: item.supplierPrice.toString(), // Convert supplierPrice to string for TextField input
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit form data to your backend here
    try {
      // Convert quantity and supplier price to numbers
      const quantity = parseFloat(formData.quantity);
      const supplierPrice = parseFloat(formData.supplierPrice);
      // Make API request to update item based on barcode number
      const response = await axios.patch(
        `http://localhost:3001/api/items/updateItemStock/${formData.barcodeNumber}`,
        { quantity, supplierPrice }
      );
      // Check if the request was successful
      if (response.status === 200) {
        // Show success message
        showSuccessToast("Item updated successfully");
        // Clear form data
        setFormData({
          barcodeNumber: "",
          itemName: "",
          quantity: "",
          supplierPrice: "",
        });
      } else {
        // Show error message
        showErrorToast("Failed to update item");
      }
    } catch (error) {
      // Handle any errors
      showErrorToast("Error updating item");
    }
    console.log(formData);
    console.log(selectedItem);
  };

  return (
    <div>
      {/* Content for New Request section */}
      <br />
      <h2>Update Stock Section</h2>
      <br />
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ paddingRight: "69%", marginBottom: "10px" }}>
              Barcode Number
            </label>
            <br />
            <select
              name="barcodeNumber"
              value={formData.barcodeNumber}
              onChange={handleChange}
              style={{
                width: "700px",
                borderRadius: "9px",
                backgroundColor: "white",
                height: "30px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              <option value="">Select an item</option>
              {items.map((item) => (
                <option
                  key={item.barcodeNumber}
                  value={item.barcodeNumber}
                  onClick={() => handleItemSelect(item)}
                >
                  {`${item.barcodeNumber}: ${item.itemName}`}
                </option>
              ))}
            </select>
            <Search style={{ marginLeft: "100px", marginTop: "10px" }} />
          </div>
          <br />
          <div>
            <label style={{ paddingRight: "71%", marginBottom: "10px" }}>
              Item Name
            </label>
            <br />

            <TextField
              name="itemName"
              type="text"
              value={formData.itemName}
              onChange={handleChange}
              placeholder="Name"
              inputProps={{
                style: {
                  width: "700px",
                  borderRadius: "9px",
                  backgroundColor: "white",
                  height: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                },
              }}
            />
            <Person style={{ marginLeft: "100px", marginTop: "10px" }} />
          </div>
          <br />
          <div>
            <label style={{ paddingRight: "73%", marginBottom: "10px" }}>
              Quantity
            </label>
            <br />

            <TextField
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="KG"
              inputProps={{
                style: {
                  width: "700px",
                  borderRadius: "9px",
                  backgroundColor: "white",
                  height: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                },
                min: 0,
              }}
            />
            <Exposure style={{ marginLeft: "100px", marginTop: "10px" }} />
          </div>
          <div>
            <br />
            <label style={{ paddingRight: "75%", marginBottom: "10px" }}>
              Supplier Price
            </label>
            <br />

            <TextField
              name="supplierPrice"
              type="number"
              value={formData.supplierPrice}
              onChange={handleChange}
              placeholder="Price"
              inputProps={{
                style: {
                  width: "700px",
                  borderRadius: "9px",
                  backgroundColor: "white",
                  height: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                },
                min: 0,
              }}
            />
            <AttachMoney style={{ marginLeft: "100px", marginTop: "12px" }} />
          </div>
          <br />
          <div style={{ marginTop: "80px", marginRight: "160px" }}>
            <Button
              onClick={() => Navigate("/SalesManagerOrders")}
              variant="contained"
              color="secondary"
              style={{
                textTransform: "none",
                backgroundColor: "green",
                color: "white",
                fontSize: "17px",
                marginRight: "40px",
                width: "150px",
              }}
              sx={{
                borderRadius: "9px",
              }}
            >
              {" "}
              Orders
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{
                textTransform: "none",
                backgroundColor: "red",
                color: "white",
                fontSize: "17px",
                width: "150px",
              }}
              sx={{
                borderRadius: "9px",
              }}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateStock;

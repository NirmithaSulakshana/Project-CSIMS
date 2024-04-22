import React from "react";
import Form from "react-bootstrap/Form";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  showErrorToast,
  showSuccessToast,
} from "../../components/ToasterMessage.jsx";

const UpdateItems = () => {
  // State variables to store form data
  const [formData, setFormData] = useState({
    barcodeNumber: "",
    itemName: "",
    botnicalName: "",
    unitPrice: "",
    Cooled: "",
    Reactive: "",
    Crushed: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to update item based on barcode number
      const response = await axios.patch(
        `http://localhost:3001/api/items/updateItem/${formData.barcodeNumber}`,
        formData
      );
      // Check if the request was successful
      if (response.status === 200) {
        // Show success message
        showSuccessToast("Item updated successfully");
        // Clear form data
        setFormData({
          barcodeNumber: "",
          itemName: "",
          botnicalName: "",
          unitPrice: "",
          Cooled: "",
          Reactive: "",
          Crushed: "",
        });
      } else {
        // Show error message
        showErrorToast("Failed to update item");
      }
    } catch (error) {
      // Handle any errors
      showErrorToast("Error updating item");
    }

    //console.log(formData);
  };

  return (
    <div>
      <div style={{ paddingTop: "35px" }}>
        {/* Content for Update Items section */}
        <h2>Update Items </h2>
      </div>
      <div style={{ paddingTop: "35px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Label
            style={{
              paddingRight: "58%",
              marginBottom: "0px",
              marginTop: "25px",
            }}
          >
            Barcode No
          </Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter barcode No"
            name="barcodeNumber"
            onChange={handleChange}
            style={{ width: "700px" }}
          />
          <Form.Label
            style={{
              paddingRight: "58%",
              marginBottom: "0px",
              marginTop: "25px",
            }}
          >
            Item Name
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Type here"
            name="itemName"
            onChange={handleChange}
            style={{ width: "700px" }}
          />
          <Form.Label
            style={{
              paddingRight: "55%",
              marginBottom: "0px",
              marginTop: "25px",
            }}
          >
            Botanical Name
          </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Type here"
            name="botnicalName"
            onChange={handleChange}
            style={{ width: "700px" }}
          />
          <Form.Label
            style={{
              paddingRight: "59%",
              marginBottom: "0px",
              marginTop: "25px",
            }}
          >
            Unit Price
          </Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Type here"
            name="unitPrice"
            onChange={handleChange}
            style={{ width: "700px" }}
          />
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            style={{ paddingRight: "58%", marginTop: "25px" }}
          >
            Behaviours
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="Cooled"
            onChange={handleChange}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Cooled" />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Not Cooled"
            />
          </RadioGroup>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="Reactive"
            onChange={handleChange}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Reactive"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Not Reactive"
            />
          </RadioGroup>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="Crushed"
            onChange={handleChange}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Crushed"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Not Crushed"
            />
          </RadioGroup>
          <Button variant="success" size="lg" type="reset">
            Reset
          </Button>{" "}
          <Button variant="success" size="lg" type="submit">
            Update
          </Button>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateItems;

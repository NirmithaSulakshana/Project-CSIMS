import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../components/styles/Order.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../components/ToasterMessage";

function Order() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const logout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const orderPlaced = () => {
    showSuccessToast("Your order placed. Thank yoy!!!");
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const handleQuantityChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleAddItem = () => {
    if (searchTerm.trim() === "") {
      showErrorToast("Please enter a item name");
      return;
    }
    if (quantity === 0) {
      showErrorToast("Add the quantity that you want");
      return;
    }

    // Fetch the item details based on the search term
    axios
      .get(`http://localhost:3001/api/items/getItems/${searchTerm}`)
      .then((response) => {
        // Check if the item already exists in the addedItems array
        const existingItem = addedItems.find(
          (item) => item.id === response.data.id
        );

        if (existingItem) {
          // If the item exists, update its quantity instead of adding a new one
          const updatedItems = addedItems.map((item) =>
            item.id === response.data.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          setAddedItems(updatedItems);
        } else {
          // If the item doesn't exist, add it to the array
          setAddedItems([...addedItems, { ...response.data, quantity }]);
        }

        setSearchTerm("");
        setQuantity(0);
      })
      .catch((error) => {
        showErrorToast("Search Item Not Found");
        console.error("Error adding item:", error);
      });
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = addedItems.filter((item) => item.id !== itemId);
    setAddedItems(updatedItems);
  };

  return (
    <div>
      <div className="container">
        <div
          className="column1"
          style={{ backgroundImage: "url(/images/basket.jpg)" }}
        >
          <Form className="d-flex align-items-center justify-content-between">
            <Form.Control
              type="search"
              placeholder="Search Item"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Form.Control
              type="number"
              placeholder="Quantity"
              className="me-2"
              aria-label="Quantity"
              value={quantity}
              onChange={handleQuantityChange}
              style={{ width: "20%" }}
            />
            <Button variant="outline-success" onClick={handleAddItem}>
              ADD
            </Button>
          </Form>
        </div>

        <div className="column2" style={{ overflow: "auto" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Item Name</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Qty.</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Unit Price($)</strong>
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.unitPrice}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div
        className="d-flex justify-content-center align-items-end"
        style={{ height: "90%", marginTop: "10px", marginBottom: "10px" }}
      >
        <Button
          variant="success"
          style={{ width: "250px", marginRight: "10px" }}
          onClick={logout}
        >
          Log Out
        </Button>
        {""}
        <Button
          variant="success"
          style={{ width: "250px" }}
          onClick={orderPlaced}
        >
          Place Order
        </Button>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Order;

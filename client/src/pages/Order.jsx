import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { AiOutlineMessage } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

function Order() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [loginCustomerId, setLoginCustomerId] = useState(0);
  const [loginCustomerFname, setLoginCustomerFname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      // Wait until accessToken is available
      while (!accessToken) {
        await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100 milliseconds
      }

      const decodedToken = jwtDecode(accessToken);
      const loggedMail = decodedToken.email;

      const loggedCustomer = customers.find(
        (customer) => customer.email === loggedMail
      );

      if (loggedCustomer) {
        const loggedFirstName = loggedCustomer.firstName;
        const loggedId = loggedCustomer.id;
        setLoginCustomerId(loggedId);
        setLoginCustomerFname(loggedFirstName);
      } else {
        console.log("Customer not found for the logged-in email.");
      }
    };

    fetchData();
  }, [customers, loginCustomerId, loginCustomerFname]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/items/getItems")
      .then((response) => {
        setItems(response.data);
      })
      .catch((err) => {
        console.log("Error fetching items", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/getUsers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((err) => {
        console.log("Error fetching customers", err);
      });
  }, []);

  // Load addedItems from localStorage on component mount
  useEffect(() => {
    const savedAddedItems = localStorage.getItem("addedItems");
    if (savedAddedItems) {
      setAddedItems(JSON.parse(savedAddedItems));
    }
  }, []);

  // Save addedItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("addedItems", JSON.stringify(addedItems));
  }, [addedItems]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("addedItems");
    navigate("/");
  };

  const orderPlaced = () => {
    if (addedItems.length === 0) {
      showErrorToast("No items added to the order.");
      return;
    }

    // Prepare the order details
    const orderDetails = addedItems.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
    }));

    console.log(loginCustomerId);
    console.log(orderDetails);

    // Send the order details to the backend
    axios
      .post("http://localhost:3001/api/orders/placeOrder", {
        customerId: loginCustomerId,
        orderDetails: orderDetails,
      })
      .then((response) => {
        if (response.data.success) {
          showSuccessToast("Order placed successfully!");
          setAddedItems([]);
        } else {
          showErrorToast("Failed to place order.");
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        showErrorToast("Failed.");
      });

    axios
      .post("http://localhost:3001/api/userItem/updateUserItems", {
        customerId: loginCustomerId,
        orderDetails: orderDetails,
      })
      .then((response) => {
        if (!response.data.success) {
          showErrorToast("Failed to update UserItem.");
        }
      })
      .catch((error) => {
        console.error("Error Placing Order", error);
      });
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
      showErrorToast("Please enter an item name");
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
        localStorage.setItem("addedItems", JSON.stringify(addedItems));

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

    localStorage.setItem("addedItems", JSON.stringify(addedItems));
  };

  const handleReset = () => {
    // Define your reset logic here
    setSearchTerm("");
    setQuantity(0);
    setAddedItems([]);
  };

  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <div className="container">
          <div
            className="column1"
            style={{ backgroundImage: "url(/images/basket.jpg)" }}
          >
            <Form className="d-flex flex-column align-items-start justify-content-between">
              <Form.Group className="mb-2">
                <Form.Label>Buyer Name</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    required
                    type="text"
                    placeholder="Buyer Name"
                    name="Name"
                    style={{ width: "150%" }}
                    value={loginCustomerFname}
                    readOnly
                  />
                  <FaUserAlt
                    style={{ marginLeft: "20px", fontSize: "2.5rem" }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Item Name</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="search"
                    placeholder="Search Item"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ width: "150%" }}
                  />
                  <FaSearch
                    style={{ marginLeft: "20px", fontSize: "2.5rem" }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Quantity</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    aria-label="Quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{ width: "150%" }}
                  />
                  <GiWeight
                    style={{ marginLeft: "20px", fontSize: "2.5rem" }}
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Message</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="textarea"
                    rows={3}
                    placeholder="Enter Message"
                    aria-label="Message"
                    style={{ width: "150%" }}
                  />
                  <AiOutlineMessage
                    style={{ marginLeft: "20px", fontSize: "2.5rem" }}
                  />
                </div>
              </Form.Group>

              <div
                className="d-flex justify-content-between align-items-center"
                style={{ width: "100%" }}
              >
                <div className="d-flex flex-column">
                  <Button
                    variant="success"
                    onClick={handleAddItem}
                    style={{ width: "150px" }}
                  >
                    ADD
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleReset}
                    style={{ width: "150px", marginTop: "10px" }}
                  >
                    RESET
                  </Button>
                </div>
                <div className="d-flex flex-column">
                  <Button
                    variant="success"
                    style={{ width: "150px" }}
                    onClick={logout}
                  >
                    Log Out
                  </Button>
                  <Button
                    variant="success"
                    style={{ width: "150px", marginTop: "10px" }}
                    onClick={orderPlaced}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            </Form>
          </div>

          <div
            className="column2"
            style={{ overflowX: "auto", maxHeight: "500px" }}
          >
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 700, border: "1px solid black" }}
                aria-label="spanning table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Item Name</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Quantity</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Unit Price($)</strong>
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addedItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">{item.unitPrice}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <MdDelete />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Order;

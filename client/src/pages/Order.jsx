import React, { useEffect } from "react";
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
import { FaUserAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { AiOutlineMessage } from "react-icons/ai";
import { jwtDecode } from "jwt-decode";

function Order() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});
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

  useEffect(() => {
    const initialQuantities = {};
    items.forEach((item) => {
      initialQuantities[item.id] = {};
      customers.forEach((customer) => {
        initialQuantities[item.id][customer.id] = 0;
      });
    });
    setQuantities(initialQuantities);
  }, [items, customers]);

  // Load quantities from localStorage
  useEffect(() => {
    const storedQuantities = localStorage.getItem("quantities");
    if (storedQuantities) {
      setQuantities(JSON.parse(storedQuantities));
    }
  }, []);

  // Save quantities to localStorage
  useEffect(() => {
    localStorage.setItem("quantities", JSON.stringify(quantities));
  }, [quantities]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("quantities");
    navigate("/");
  };

  const orderPlaced = () => {
    showSuccessToast("Your order placed. Thank you!!!");
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
        const itemId = response.data.id;

        // Check if the item already exists in the addedItems array
        const existingItem = addedItems.find(
          (item) => item.id === response.data.id
        );

        setQuantities((prevQuantities) => {
          const updatedQuantities = { ...prevQuantities };

          if (existingItem) {
            // If the item exists, update its quantity instead of adding a new one
            updatedQuantities[itemId][loginCustomerId] += quantity;
          } else {
            // If the item doesn't exist, add it to the array
            updatedQuantities[itemId][loginCustomerId] = quantity;
          }

          return updatedQuantities;
        });

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

          <div className="column2">
            {items && customers && Object.keys(quantities).length > 0 && (
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 700, border: "1px solid black" }}
                  aria-label="spanning table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          backgroundColor: "#30F4FA",
                          border: "1px solid black",
                        }}
                      >
                        <strong>Item Name</strong>
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#30F4FA",
                          border: "1px solid black",
                        }}
                      >
                        <strong>Unit Price($)</strong>
                      </TableCell>
                      {customers.map((customer) => (
                        <TableCell
                          key={customer.id}
                          align="center"
                          style={{
                            color: "red",
                            backgroundColor: "yellow",
                            border: "1px solid black",
                          }}
                        >
                          {customer.firstName}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          style={{
                            color: "red",
                            backgroundColor: "#30F4FA",
                            border: "1px solid black",
                          }}
                        >
                          {item.itemName}
                        </TableCell>
                        <TableCell
                          style={{
                            color: "red",
                            backgroundColor: "#30F4FA",
                            border: "1px solid black",
                          }}
                        >
                          {item.unitPrice}
                        </TableCell>
                        {customers.map((customer) => (
                          <TableCell
                            key={customer.id}
                            align="center"
                            style={{
                              border: "1px solid black",
                              cursor:
                                quantities[item.id] &&
                                quantities[item.id][customer.id]
                                  ? "pointer"
                                  : "default",
                            }}
                            onClick={() => {
                              if (
                                quantities[item.id] &&
                                quantities[item.id][customer.id]
                              ) {
                                const confirmDelete = window.confirm(
                                  `Do you want to delete ${
                                    quantities[item.id][customer.id]
                                  } kg of ${item.itemName} for ${
                                    customer.firstName
                                  }?`
                                );

                                if (confirmDelete) {
                                  // User clicked "OK", delete the quantity
                                  setQuantities((prevQuantities) => {
                                    const updatedQuantities = {
                                      ...prevQuantities,
                                    };
                                    updatedQuantities[item.id][customer.id] = 0;
                                    return updatedQuantities;
                                  });
                                }
                              }
                            }}
                          >
                            {quantities[item.id] &&
                              quantities[item.id][customer.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
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

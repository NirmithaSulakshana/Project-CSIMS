import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../components/styles/previousOrder.css";

function PreviousOrder() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [previousOrderDetails, setPreviousOrderDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch items
        const itemsResponse = await axios.get(
          "http://localhost:3001/api/items/getItems"
        );
        setItems(itemsResponse.data);

        // Fetch customers
        const customersResponse = await axios.get(
          "http://localhost:3001/api/users/getApprovedUsers"
        );
        setUsers(customersResponse.data);

        // Fetch previous order details based on ID from localStorage
        const orderId = localStorage.getItem("previousOrderId");
        if (orderId) {
          const orderDetailsResponse = await axios.get(
            `http://localhost:3001/api/previousOrder/getPreviousOrderDetailsById?orderId=${orderId}`
          );

          // Parse the data string into an array of objects
          const responseData = JSON.parse(orderDetailsResponse.data.data);

          setPreviousOrderDetails(responseData);
        }
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="tableContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="item user table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCellColor">Item Name</TableCell>
              {users.map((user) => (
                <TableCell key={user.id} className="tableCellColor">
                  {user.firstName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="tableCellColor">
                  {item.itemName}
                </TableCell>
                {users.map((user) => {
                  const orderDetail = previousOrderDetails.find(
                    (detail) =>
                      detail.ItemId === item.id && detail.UserId === user.id
                  );
                  const quantity = orderDetail ? orderDetail.quantity : 0;
                  return (
                    <TableCell key={user.id}>
                      <span style={{ color: quantity === 0 ? "black" : "red" }}>
                        {quantity}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PreviousOrder;

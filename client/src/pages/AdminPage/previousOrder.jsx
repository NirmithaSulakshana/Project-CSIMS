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
              <TableCell className="tableCellColor">Item</TableCell>
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
                {users.map((user) => (
                  <TableCell key={user.id}>
                    {/* Render user-specific data */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PreviousOrder;

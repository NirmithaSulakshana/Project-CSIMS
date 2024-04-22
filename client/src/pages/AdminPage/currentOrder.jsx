import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
import "../../components/styles/adminOrder.css";
import Footer from "../../components/Footer";

function CurrentOrder() {
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userItems, setUserItems] = useState([]);
  const navigate = useNavigate();

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
        setCustomers(customersResponse.data);

        // Fetch user items
        const userItemsResponse = await axios.get(
          "http://localhost:3001/api/userItem/getAllUserItems"
        );
        setUserItems(userItemsResponse.data.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleSendToPacking = () => {
    const previousOrderDetails = userItems.map((item) => ({
      UserId: item.UserId,
      ItemId: item.ItemId,
      quantity: item.quantity,
    }));

    axios
      .post("http://localhost:3001/api/previousOrder/placePreviousOrder", {
        previousOrderDetails: previousOrderDetails,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("success previous");
        } else {
          console.log("error previous");
        }
      })
      .catch((error) => {
        console.error("Error placing previous order:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUserItemQuantity = (itemId, userId) => {
    const userItem = userItems.find(
      (item) => item.ItemId === itemId && item.UserId === userId
    );
    return userItem ? userItem.quantity : 0;
  };

  return (
    <div className="containerDivision">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="tableHead">
              <TableRow>
                <TableCell>Item Name</TableCell>
                {customers.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.firstName}
                  </TableCell>
                ))}
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="tableCellHeads">
                      {item.itemName}
                    </TableCell>
                    {customers.map((customer) => (
                      <TableCell key={customer.id}>
                        {getUserItemQuantity(item.id, customer.id)}
                      </TableCell>
                    ))}
                    <TableCell className="tableHead">
                      {customers.reduce(
                        (acc, customer) =>
                          acc + getUserItemQuantity(item.id, customer.id),
                        0
                      )}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor:
                          customers.reduce(
                            (acc, customer) =>
                              acc + getUserItemQuantity(item.id, customer.id),
                            0
                          ) < item.quantity
                            ? "green"
                            : "red",
                      }}
                    >
                      {customers.reduce(
                        (acc, customer) =>
                          acc + getUserItemQuantity(item.id, customer.id),
                        0
                      ) < item.quantity
                        ? item.quantity -
                          customers.reduce(
                            (acc, customer) =>
                              acc + getUserItemQuantity(item.id, customer.id),
                            0
                          )
                        : customers.reduce(
                            (acc, customer) =>
                              acc + getUserItemQuantity(item.id, customer.id),
                            0
                          ) - item.quantity}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div className="sfpButton">
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={handleSendToPacking}>
            Send to Packing
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </Stack>
      </div>
      <Footer />
    </div>
  );
}

export default CurrentOrder;

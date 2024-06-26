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

const Packing = () => {
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [userItems, setUserItems] = useState([]);

  const [packingDetails, setPackingDetails] = useState({});

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

  const checkItemProperty = (item) => {
    const property = {
      cooled: item.cooled,
      crushed: item.crushed,
      reacted: item.reacted,
    };
    if (
      property.crushed == true &&
      property.cooled == true &&
      property.reacted == true
    ) {
      return "Only Single packing";
    }
    if (
      property.crushed == true &&
      property.cooled == true &&
      property.reacted == false
    ) {
      return "Comnination packing OK";
    }
    if (
      property.crushed == true &&
      property.cooled == false &&
      property.reacted == true
    ) {
      return "Only Single packing";
    }
    if (
      property.crushed == true &&
      property.cooled == false &&
      property.reacted == false
    ) {
      return "Only Single packing";
    }
    if (
      property.crushed == false &&
      property.cooled == true &&
      property.reacted == true
    ) {
      return "Only Single packing";
    }
    if (
      property.crushed == false &&
      property.cooled == true &&
      property.reacted == false
    ) {
      return "Comnination packing OK";
    }
    if (
      property.crushed == false &&
      property.cooled == false &&
      property.reacted == true
    ) {
      return "Only Single packing";
    }
    if (
      property.crushed == false &&
      property.cooled == false &&
      property.reacted == false
    ) {
      return "Comnination packing OK";
    }
  };
  const calTotalWeight = (item) => {
    let totalWeight = 0;
    totalWeight = customers.reduce(
      (acc, customer) => acc + getUserItemQuantity(item.id, customer.id),
      0
    );
    return totalWeight;
  };

  const pack = (weight) => {
    const packObj = {
      detail: "",
      numberOfBox: 0,
    };
    if (weight == 0 || weight == 1) {
      packObj.detail = "Nothing to Pack";
      packObj.numberOfBox = 0;
      return packObj;
    } else {
      if (weight > 25) {
        if (weight > 40) {
          if (weight > 45) {
            packObj.detail = "Packing in Large and small Regiform Box";
            packObj.numberOfBox = 2;
            return packObj;
          } else {
            packObj.detail = "Packing in Large Regiform Box";
            packObj.numberOfBox = 1;
            return packObj;
          }
        } else {
          packObj.detail = "Packing in two Small Regiform Box";
          packObj.numberOfBox = 2;
          return packObj;
        }
      } else {
        packObj.detail = "Packing in a small Regiform Box";
        packObj.numberOfBox = 2;
        return packObj;
      }
    }
  };

  const handleSinglePacking = (item, isChecked) => {
    if (isChecked) {
      let totalWeight = 0;
      if (item.cooled == true) {
        totalWeight = calTotalWeight(item);
        totalWeight++;
        setPackingDetails({
          ...packingDetails,
          [item.id]: pack(totalWeight),
        });
      } else {
        totalWeight = calTotalWeight(item);
        setPackingDetails({
          ...packingDetails,
          [item.id]: pack(totalWeight),
        });
      }
    } else {
      // If checkbox is unchecked, remove the packing details for the item
      setPackingDetails({
        ...packingDetails,
        [item.id]: undefined,
      });
    }
  };

  return (
    <>
      <div>
        {/* Content for Packing section */}
        <h2>Packing Section</h2>
      </div>
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
                  <TableCell>Status for Paccking</TableCell>
                  {/*Inside the TableHead component, add a new TableCell for
                  checkboxes */}
                  <TableCell>Single Item Packing</TableCell>
                  <TableCell>Packing details</TableCell>
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
                        {/* calculating the total weight for customer order */}
                        {customers.reduce(
                          (acc, customer) =>
                            acc + getUserItemQuantity(item.id, customer.id),
                          0
                        )}
                      </TableCell>
                      <TableCell>{checkItemProperty(item)}</TableCell>
                      {/*Inside the TableBody component, for each row, add a new TableCell with a checkbox */}
                      <TableCell>
                        <input
                          type="checkbox"
                          // Logic to handle checkbox value
                          /* Logic to determine if this item should be packed as a single item */
                          onChange={(e) => {
                            // Logic to handle checkbox change
                            const isChecked = e.target.checked;
                            handleSinglePacking(item, isChecked);
                          }}
                        />
                      </TableCell>
                      <TableCell>{packingDetails[item.id]?.detail}</TableCell>
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
            <Button variant="outlined">Create pakcking list</Button>
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
      </div>
    </>
  );
};

export default Packing;

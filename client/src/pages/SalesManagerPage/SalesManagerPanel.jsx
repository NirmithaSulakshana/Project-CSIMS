import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
} from "@mui/material";
import UpdateStock from "./updateStock";
import UpdateSalesManagerItems from "../AdminPage/updateItems.jsx";
import SalesManagerPacking from "./packing";
import SalesManagerOrders from "../AdminPage/orders.jsx";
import { Menu } from "@mui/icons-material";
import Footer from "../../components/Footer";

const SalesManagerPanel = () => {
  const [selectedSection, setSelectedSection] = useState("newRequest");
  const [showList, setShowList] = useState(true);

  const renderSection = () => {
    switch (selectedSection) {
      case "updateStock":
        return <UpdateStock />;
      case "updateItems":
        return <UpdateSalesManagerItems />;
      case "packing":
        return <SalesManagerPacking />;
      case "orders":
        return <SalesManagerOrders />;
      default:
        return null;
    }
  };

  const MenuButton = () => (
    <button
      onClick={() => setShowList(!showList)}
      style={{ backgroundColor: "#373A38", border: "1px solid #373A38" }}
    >
      {showList ? (
        <Menu sx={{ color: "#ffffff", marginTop: "10px" }} />
      ) : (
        <Menu sx={{ color: "#ffffff", marginTop: "10px" }} />
      )}
    </button>
  );

  return (
    <div style={{ display: "", height: "100%", width: "100%", margin: "0px" }}>
      <Stack direction="row" sx={{ width: "100%" }}>
        <div
          style={{
            paddingBottom: "50%",
            backgroundColor: "#373A38",
            width: "3%",
            border: "0px solid #000000",
          }}
        >
          <MenuButton />
        </div>
        <div style={{ display: { xs: "none", sm: "block", margin: "0px" } }}>
          {showList && (
            <List
              style={{
                width: "100%",
                height: "100%",
                marginTop: "0%",
                backgroundColor: "#373A38",
                color: "#ffffff",
                border: "0px solid #000000",
              }}
            >
              <hr />
              <ListItem
                button
                onClick={() => setSelectedSection("updateStock")}
                style={{ textAlign: "center" }}
              >
                <Box
                  style={{
                    backgroundColor: "",
                    padding: "5px",
                    width: "200px",
                    height: "55px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItemText primary="Update Stock" />
                </Box>
              </ListItem>
              <Divider />
              <hr />
              <ListItem
                button
                onClick={() => setSelectedSection("updateItems")}
                style={{ textAlign: "center" }}
              >
                <Box
                  style={{
                    backgroundColor: "d",
                    padding: "5px",
                    width: "200px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItemText primary="Update Items" />
                </Box>
              </ListItem>
              <Divider />
              <hr />
              <ListItem
                button
                onClick={() => setSelectedSection("packing")}
                style={{ textAlign: "center" }}
              >
                <Box
                  style={{
                    backgroundColor: "",
                    padding: "5px",
                    width: "200px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItemText primary="Packing" />
                </Box>
              </ListItem>
              <Divider />
              <hr />
              <ListItem
                button
                onClick={() => setSelectedSection("orders")}
                style={{ textAlign: "center" }}
              >
                <Box
                  style={{
                    backgroundColor: "",
                    padding: "5px",
                    width: "200px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ListItemText primary="Orders" />
                </Box>
              </ListItem>
              <Divider />
              <hr />
            </List>
          )}
        </div>

        <div
          style={{
            flex: showList ? 1 : 2,
            //paddingBottom: "50%",
            //height:"85%",
            marginTop: "0%",
            backgroundColor: "#C7E0CC",
            border: "0px solid #000000",
            boxSizing: "border-box",
          }}
        >
          {renderSection()}
        </div>
      </Stack>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SalesManagerPanel;

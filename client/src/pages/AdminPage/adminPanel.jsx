import React, { useState } from "react";
import { List, ListItem, ListItemText, Divider, Stack } from "@mui/material";
import NewRequest from "./newRequest";
import AddNewItem from "./addNewItem";
import UpdateItems from "./updateItems";
import Orders from "./orders";
import Documents from "./documents";
import Packing from "./packing";
import { Menu } from "@mui/icons-material";
import Footer from "../../components/Footer";

const AdminPanel = () => {
  const [selectedSection, setSelectedSection] = useState("newRequest");
  const [showList, setShowList] = useState(true);

  const renderSection = () => {
    switch (selectedSection) {
      case "newRequest":
        return <NewRequest />;
      case "addNewItem":
        return <AddNewItem />;
      case "updateItems":
        return <UpdateItems />;
      case "orders":
        return <Orders />;
      case "packing":
        return <Packing />;
      case "documents":
        return <Documents />;
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
        <Menu sx={{ color: "#ffffff" }} />
      ) : (
        <Menu sx={{ color: "#ffffff" }} />
      )}
    </button>
  );

  return (
    <div style={{ display: "", height: "100%", width: "100%", margin: "0pxs" }}>
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
                paddingBottom: "325%",

                // height: '85%',
                marginTop: "0%",
                backgroundColor: "#373A38",
                color: "#ffffff",
                border: "0px solid #000000",
              }}
            >
              <ListItem button onClick={() => setSelectedSection("newRequest")}>
                <ListItemText primary="New Request" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => setSelectedSection("addNewItem")}>
                <ListItemText primary="Add New Item" />
              </ListItem>
              <Divider />
              <ListItem
                button
                onClick={() => setSelectedSection("updateItems")}
              >
                <ListItemText primary="Update Items" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => setSelectedSection("orders")}>
                <ListItemText primary="Orders" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => setSelectedSection("packing")}>
                <ListItemText primary="Packing" />
              </ListItem>
              <Divider />
              <ListItem button onClick={() => setSelectedSection("documents")}>
                <ListItemText primary="Documents" />
              </ListItem>
            </List>
          )}
        </div>

        <div
          style={{
            flex: showList ? 1 : 2,
            paddingBottom: "50%",
            // height:"85%",
            marginTop: "0%",
            backgroundColor: "#C7E0CC",
            border: "0px solid #000000",
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

export default AdminPanel;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MessageIcon from "@mui/icons-material/Message";
import axios from "axios";

const NewRequest = () => {
  const [newRequests, setNewRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/getPendingUsers")
      .then((response) => {
        setNewRequests(response.data);
      });
  }, []);

  const timeOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  return (
    <div className="nw_container" style={{ height: "600px" }}>
      <Box
        sx={{
          width: "90%",
          bgcolor: "background.paper",
          marginLeft: "5%",
          marginTop: "2%",
          height: "100%",
          overflowY: "auto",
        }}
      >
        {newRequests.length === 0 ? (
          <h1>There is no new requests!!</h1>
        ) : (
          <List>
            {newRequests.map((request) => (
              <ListItem key={request.id} disablePadding>
                <ListItemButton
                  component={Link}
                  to={`/AdminPage/details/${request.id}`}
                >
                  <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`New request from ${request.firstName} ${
                      request.lastName
                    } at ${new Date(request.createdAt).toLocaleString(
                      undefined,
                      timeOptions
                    )}`}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </div>
  );
};

export default NewRequest;

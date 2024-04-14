import React from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { useEffect, useState } from "react";

function SimpleMailBadge() {
  const [newRequests, setNewRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/users/getPendingUsers")
      .then((response) => {
        setNewRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching new requests:", error);
      });
  }, []);

  const newRequestsCount = newRequests ? newRequests.length : 0;

  return (
    <div>
      <Badge badgeContent={newRequestsCount} color="primary">
        <MailIcon color="action" />
      </Badge>
    </div>
  );
}

export default SimpleMailBadge;

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { lightGreen } from "@mui/material/colors";
import {
  showSuccessToast,
  showErrorToast,
} from "../../components/ToasterMessage";
import { ToastContainer } from "react-toastify";

function FullDetails() {
  const { id } = useParams();
  const [requestDetails, setRequestDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/users/getUsers/${id}`)
      .then((response) => {
        setRequestDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching request details:", error);
        setLoading(false);
      });
  }, [id]);

  const timeOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!requestDetails) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6">Error fetching request details.</Typography>
      </Box>
    );
  }

  const handleApprove = () => {
    axios
      .put(`http://localhost:3001/api/users/approve/${id}`)
      .then((response) => {
        if (response.status === 200) {
          showSuccessToast("Succesfully approved the customer!!");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }
      })
      .catch((error) => {
        showErrorToast("Error approving");
        console.error("Error approving user:", error);
      });
  };

  const handleReject = () => {
    axios
      .delete(`http://localhost:3001/api/users/reject/${id}`)
      .then((response) => {
        if (response.status === 200) {
          showSuccessToast("Succesfully rejected and remove the customer!!");
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        }
      })
      .catch((error) => {
        showErrorToast("Error rejecting and removing customer!!");
        console.error("Error rejecting user:", error);
      });
  };

  return (
    <div>
      <Box sx={{ padding: 2, marginTop: "5%", backgroundColor: lightGreen }}>
        <Typography variant="h3" style={{ color: "blue" }}>
          {"New Customer Request"}
        </Typography>
        <Typography variant="h6">
          {`Details for request from ${requestDetails.firstName} ${requestDetails.lastName}`}
        </Typography>
        <Typography>{`Email: ${requestDetails.email}`}</Typography>
        <Typography>{`Username: ${requestDetails.userName}`}</Typography>
        <Typography>{`Mobile Number: ${requestDetails.mobileNo}`}</Typography>
        <Typography>{`Country: ${requestDetails.country}`}</Typography>
        <Typography>
          {`Submitted at: ${new Date(requestDetails.createdAt).toLocaleString(
            undefined,
            timeOptions
          )}`}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
          <Button variant="outlined" color="success" onClick={handleApprove}>
            Approve
          </Button>
          <Button variant="outlined" color="error" onClick={handleReject}>
            Reject
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </Button>
        </Stack>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default FullDetails;

import React, { useEffect, useState } from "react";
import { Alert, Calendar, Button } from "antd";
import dayjs from "dayjs";
import FlightIcon from "@mui/icons-material/Flight";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory
import "../../components/styles/orderCalender.css";
import Footer from "../../components/Footer";

function OrderCalender() {
  const [value, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs());
  const [previousOrderDates, setPreviousOrderDates] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPreviousOrderDates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/previousOrder/getPreviousOrdersUpdatedAt"
        );

        if (response.data.success) {
          const updatedAtDates = response.data.data.map(
            (updatedAtDate) => updatedAtDate.updatedAtDate
          );

          setPreviousOrderDates(updatedAtDates);
        } else {
          console.error(
            "Failed to fetch previous order dates:",
            response.data.error
          );
        }
      } catch (error) {
        console.error("Error fetching previous order dates:", error);
      }
    };

    fetchPreviousOrderDates();
  }, []);

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);

    const dateString = newValue.format("YYYY-MM-DD");
    const isPreviousOrderDate = previousOrderDates.includes(dateString);
    setShowButton(isPreviousOrderDate);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const handleButtonClick = () => {
    navigate("/AdminPage/PreviousOrder");
  };

  const dayOfWeek = selectedValue.format("dddd");

  const dateCellRender = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    const isPreviousOrderDate = previousOrderDates.includes(dateString);

    return isPreviousOrderDate ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          color: "green",
        }}
      >
        <FlightIcon />
      </div>
    ) : null;
  };

  return (
    <>
      <div className="calContainer">
        <div className="dateTitle">
          <Alert
            message={`${selectedValue?.format("YYYY-MM-DD")} (${dayOfWeek})`}
          />
        </div>
        <div className="contentCalender">
          <Calendar
            value={value}
            onSelect={onSelect}
            onPanelChange={onPanelChange}
            cellRender={dateCellRender}
          />
        </div>
        {showButton && (
          <div className="buttonContainer">
            <Button type="primary" onClick={handleButtonClick}>
              View Order Details
            </Button>
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default OrderCalender;

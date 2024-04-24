import React, { useEffect, useState } from "react";
import { Alert, Calendar, Button } from "antd";
import dayjs from "dayjs";
import FlightIcon from "@mui/icons-material/Flight";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../components/styles/orderCalender.css";
import Footer from "../../components/Footer";

function OrderCalender() {
  const [value, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs());
  const [previousOrderDates, setPreviousOrderDates] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
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

    if (isPreviousOrderDate) {
      setSelectedOrderId(null); // Reset selected order ID
    }
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const handleDateCellClick = async (date) => {
    const dateString = date.format("YYYY-MM-DD");
    try {
      const response = await axios.get(
        `http://localhost:3001/api/previousOrder/getPreviousOrders?date=${dateString}`
      );
      if (response.data.success) {
        const orderIds = response.data.data.map((order) => order.id);
        if (orderIds.length > 0) {
          // Store the order ID of the selected date in local storage
          setSelectedOrderId(orderIds[0]);
        } else {
          console.error("No previous orders found for the selected date");
        }
      } else {
        console.error(
          "Failed to fetch previous order IDs for the selected date:",
          response.data.error
        );
      }
    } catch (error) {
      console.error("Error fetching previous order IDs:", error);
    }
  };

  const handleButtonClick = () => {
    if (selectedOrderId) {
      localStorage.setItem("previousOrderId", selectedOrderId);
      navigate("/AdminPage/PreviousOrder");
    } else {
      console.error("No order selected for the current date");
    }
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
          cursor: "pointer",
        }}
        onClick={() => handleDateCellClick(date)}
      >
        <FlightIcon />
      </div>
    ) : null;
  };

  return (
    <>
      <div className="calenderHead">
        <h1>Previous Order Calendar</h1>
      </div>
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

import React, { useEffect, useState } from "react";
import { Alert, Calendar } from "antd";
import dayjs from "dayjs";
import FlightIcon from "@mui/icons-material/Flight";
import axios from "axios";
import "../../components/styles/orderCalender.css";
import Footer from "../../components/Footer";

function OrderCalender() {
  const [value, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs());
  const [previousOrderDates, setPreviousOrderDates] = useState([]);

  useEffect(() => {
    const fetchPreviousOrderDates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/previousOrder/getPreviousOrdersUpdatedAt"
        );

        if (response.data.success) {
          // Extract updatedAt dates from the response data
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
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  // Get the day of the week of the selected date
  const dayOfWeek = selectedValue.format("dddd");

  // Custom date cell render function
  const dateCellRender = (date) => {
    const dateString = date.format("YYYY-MM-DD");

    // Check if the date is in the previous order dates
    const isPreviousOrderDate = previousOrderDates.includes(dateString);

    // Render flight icon if it's a previous order date
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
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default OrderCalender;

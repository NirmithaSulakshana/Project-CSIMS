import React, { useEffect, useState } from "react";
import { Alert, Calendar } from "antd";
import dayjs from "dayjs";
import FlightIcon from "@mui/icons-material/Flight";
import "../../components/styles/orderCalender.css";
import Footer from "../../components/Footer";
import axios from "axios";

function OrderCalender() {
  const [value, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs());
  const [previousOrderDates, setPreviousOrderDates] = useState([]);

  useEffect(() => {
    const fetchPreviousOrderDates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/previousOrder/getPreviousOrders"
        );

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          const dates = response.data.map((order) =>
            dayjs(order.updatedAt).format("YYYY-MM-DD")
          );
          setPreviousOrderDates(dates);
        } else {
          console.error("API response is not an array:", response.data);
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
    let content = null;

    console.log("is array ", Array.isArray(previousOrderDates));
    console.log(previousOrderDates.length > 0);
    console.log(previousOrderDates);

    // Check if previousOrderDates is defined and not empty
    if (Array.isArray(previousOrderDates) && previousOrderDates.length > 0) {
      // Check if the date is in the previous order dates
      if (previousOrderDates.includes(dateString)) {
        content = (
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
        );
      }
    }

    return content;
  };

  return (
    <>
      <div className="calContainer">
        <div className="dateTitle">
          <Alert
            message={`${selectedValue?.format("YYYY-MM-DD")} (${dayOfWeek})`}
          />
        </div>
        <div className="contentCalender ">
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

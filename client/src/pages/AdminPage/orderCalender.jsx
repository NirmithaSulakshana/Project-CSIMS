import React, { useState } from "react";
import { Alert, Calendar } from "antd";
import dayjs from "dayjs";
import FlightIcon from "@mui/icons-material/Flight";
import "../../components/styles/orderCalender.css";
import Footer from "../../components/Footer";

function OrderCalender() {
  const [value, setValue] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState(dayjs());

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);

    const day = newValue.date();
    if (day === 2 || day === 18 || day === 25) {
      // Display alert message
      alert("View Order Details");
    }
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  // Get the day of the week of the selected date
  const dayOfWeek = selectedValue.format("dddd");

  // Custom date cell render function
  const dateCellRender = (date) => {
    const day = date.date();
    let content = null;

    if (day === 2 || day === 18 || day === 25) {
      content = (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "orange",
          }}
        >
          <FlightIcon />
        </div>
      );
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
            dateCellRender={dateCellRender}
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

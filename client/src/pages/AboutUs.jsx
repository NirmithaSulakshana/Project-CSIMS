import React from "react";
import "../components/styles/aboutUs.css";
import Footer from "../components/Footer";

function AboutUs() {
  return (
    <div>
      <div className="a-main">
        <div className="a-lCorner"></div>
        <div className="a-rCorner">
          <h1 className="a-head">About Us</h1>
          <p className="a-text">
            This is the company discription. How it works. How they do that
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;

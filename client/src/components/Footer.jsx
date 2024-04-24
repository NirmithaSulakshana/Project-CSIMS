import React from "react";
import "./styles/footStyles.css";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <div className="ft-main">
      <div className="ft-details">
        <img src="images/footerlogo.png" alt="CS logo" className="ft-img" />
        <PlaceIcon />
        <span>197/5, Wataddara Veyangoda</span>
        <br /> <PhoneIcon />
        <span>0771234578</span>
        <br />
        <EmailIcon />
        <span>kalumnet@gmail.com</span>
      </div>
      <div className="ft-links">
      <div className='links'>
                <span><a href = "">Home</a>&nbsp;&nbsp;&nbsp;</span>
                <span><a href = "">About Us</a>&nbsp;&nbsp;&nbsp;</span>
                <span><a href = "">Why Us</a>&nbsp;&nbsp;&nbsp;</span>
                <span><a href = "">Vision</a></span>
            </div>
        <br />
        <p
          style={{
            color: "white",
            fontSize: "small",
            fontWeight: "tiny",
            paddingTop: "5px",
          }}
        >
          &copy; 2024 CS ruits & Vegetables. All rights reserved.
        </p>
      </div>
      <div className="ft-media commn">
        <h5>Search Us On</h5>
            <a href = 'https://www.facebook.com'><FacebookIcon /></a> 
            <a href = 'https://www.instagram.com'><InstagramIcon /></a> 
            <a href = 'https://www.linkedin.com'><LinkedInIcon /></a>
      </div>
    </div>
  );
}

export default Footer;

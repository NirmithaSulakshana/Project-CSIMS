import React from 'react';
import './Footer.css'

import footer_logo_icon from '../Assets/footer_logo.png'
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <div className="ft-main">
        <div className="ft-details">
            <img src={footer_logo_icon} alt="CS logo" className="ft-img" />
            <PlaceIcon />
            <span>197/5, Wataddara Veyangoda</span>
            <br /> <PhoneIcon />
            <span>0771234578</span>
            <br />
            <EmailIcon />
            <span>example@gmail.com</span>
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
            fontSize: "8px",
            fontWeight: "tiny",
            paddingTop: "-30px",
            }}
        >
            &copy; 2023 Your Company. All rights reserved.
        </p>
    </div>
    <div className="ft-media-commn">
      <h5>Search Us On</h5>
      <a href = 'https://www.facebook.com'><FacebookIcon /></a> 
      <a href = 'https://www.instagram.com'><InstagramIcon /></a> 
      <a href = 'https://www.linkedin.com'><LinkedInIcon /></a>
    </div>
  </div>
);
}

export default Footer;
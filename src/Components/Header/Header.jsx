import React from 'react';
import './Header.css'
import logo_icon from '../Assets/logo.png'

const Header = () => {
  return (
    <div className="header">
        <img src={logo_icon} alt="" />
        <h3>CS FRESH FRUIT AND VEGETABLES</h3>
        <p>197/5, Wataddara Veyangoda.</p>
    </div>
  );
};

export default Header;
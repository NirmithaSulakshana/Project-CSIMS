import React from "react";
import "../components/styles/headelement.css";

function Headelement() {
  return (
    <div className="head">
      <div>
        <img src="images/CSfresh.png" className="csLogo" alt="CS logo" />
      </div>
      <div className="title">
        <h1 className="companyTitle">CS FRESH FRUIT AND VEGETABLES</h1>
        <span className="companyAddress">197/5, Wataddara Veyangoda.</span>
      </div>
    </div>
  );
}

export default Headelement;

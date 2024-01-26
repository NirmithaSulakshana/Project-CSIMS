import React from "react";
import DarkVariant from "../components/DarkVariant";
import Footer from "../components/Footer";
import "../components/styles/homeStyle.css";

function Home() {
  return (
    <div>
      <DarkVariant />
      <div className="d-sec">
        <div className="w-img">
          <img
            src="images/vegiTrans.png"
            alt="Vegitable bucket"
            className="img-vegi"
          />
        </div>
        <div id="whyChooseUs" className="w-desc">
          <p className="description">Why Choose Us:</p>
          <br />
          <p style={{ fontSize: "x-large" }}>
            Welcome to CS FRESH - Your Trusted Exporter <br />
            of Premium Sri Lankan Vegetables and Fruits
          </p>
          <br />
          <table>
            <tr>
              <td>
                <img src="images/quality.png" alt="logo" className="w-logos" />
              </td>
              <td>
                <p>
                  <span className="w-topics">Quality Assurance:</span> <br />
                  CS FRESH is synonymous with premium vegetables and fruits. We
                  use stringent quality assurance procedures to guarantee our
                  products meet and exceed international standards. When you
                  choose us, you choose excellence!
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <img src="images/reliable.png" alt="logo" className="w-logos" />
              </td>
              <td>
                <p>
                  <span className="w-topics">Reliability:</span> <br />
                  Our track record of successfully paying off a significant
                  initial liability speaks volumes about our financial stability
                  and commitment to our business partners. You may count on us
                  as a reliable partner.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="images/experiance.png"
                  alt="logo"
                  className="w-logos"
                />
              </td>
              <td>
                <p>
                  <span className="w-topics">Experience:</span> <br /> With over
                  twenty years in the industry, we have gained invaluable
                  experience and insights into the export market. Our expertise
                  ensures that your vegetable and fruit orders are handled
                  precisely and carefully.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="images/practices.png"
                  alt="logo"
                  className="w-logos"
                />
              </td>
              <td>
                <p>
                  <span className="w-topics">Sustainable Practices:</span>{" "}
                  <br /> We are dedicated to environmentally friendly farming
                  practices. Every facet of our company is committed to
                  environmental responsibility operation, from cultivation to
                  packaging and delivery.
                </p>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <hr />
      <div className="ww-offer">
        <p className="description toCenter">What We Offer for You</p>
        <p p style={{ fontSize: "x-large", textAlign: "center" }}>
          CS FRESH provides a comprehensive range of services and benefits to
          our valued clients
        </p>
        <div className="ww-detail ww-color1">
          <p>
            Premium Vegetables and Fruits Our selection of Sri Lankan <br />
            vegetables and fruits are chosen for quality and <br />
            freshness.
          </p>
        </div>
        <div className="ww-detail ww-color2">
          <p>
            Reliable Supply Chain Our reliable distribution network consistently
            <br />
            delivers your orders on time.
          </p>
        </div>
        <div className="ww-detail ww-color3">
          <p>
            Custom Packaging We understand that each customer may <br />
            have unique packaging requirements. We offer customizable packaging{" "}
            <br />
            options to meet your specific needs.
          </p>
        </div>
        <div className="ww-detail ww-color4">
          <p>
            Competitive Pricing We have low prices without sacrificing quality,
            <br />
            providing excellent value for your <br />
            investment.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

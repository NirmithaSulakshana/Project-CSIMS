import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import "../components/styles/carouStyle.css";
import LogInForm from "./LogInForm";
import ReactDOM from "react-dom";
//import { useNavigate } from "react-router-dom";

function DarkVariant() {
  //const Navigate = useNavigate();
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);

  const openLoginForm = () => {
    setLoginFormVisible(true);
  };

  const closeLoginForm = () => {
    setLoginFormVisible(false);
  };
  return (
    <div>
      <Carousel data-bs-theme="dark">
        <Carousel.Item className="c-item">
          <img
            className="d-block w-100 c-img"
            src="images/Image2.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h2 className="c-lable">
              Bringing Sri Lanka's Finest Vegetables
              <br />
              and Fruits to the World.
            </h2>
            <Button onClick={() => openLoginForm()} variant="primary" size="lg">
              Sign In
            </Button>{" "}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="c-item">
          <img
            className="d-block w-100 c-img"
            src="images/Image1.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3 className="c-lable">Sri Lanka's largest exporters</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="c-item">
          <img
            className="d-block w-100 c-img"
            src="images/Image3.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3 className="c-lable">Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {isLoginFormVisible &&
        ReactDOM.createPortal(
          <LogInForm onClose={closeLoginForm} />,
          document.body
        )}
    </div>
  );
}

export default DarkVariant;

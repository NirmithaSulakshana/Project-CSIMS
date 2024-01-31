import React, { useState } from "react";
import { Form, Col, InputGroup, Button, Row } from "react-bootstrap";
import "../components/styles/SignC.css";
import Footer from "../components/Footer";
import axios from "axios";

const countryCodes = {
  Italy: "+39",
  "Sri Lanka": "+94",
  // Add more country codes as needed
};

function Sign() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    // Automatically set the mobile field to the country code
    if (selectedCountry && countryCodes[selectedCountry]) {
      setMobile(countryCodes[selectedCountry]);
    } else {
      setMobile("");
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    console.log("Form:", form);
    if (form.checkValidity() === false || !passwordsMatch) {
      setValidated(true);
      event.stopPropagation();
    } else {
      // Display a confirmation dialog
      const userConfirmed = window.confirm(
        "Are you sure you want to create an account?"
      );
      if (userConfirmed) {
        // Create an object to hold form data
        const formData = {
          firstName: form.elements["firstName"].value,
          lastName: form.elements["lastName"].value,
          email: form.elements["email"].value,
          userName: form.elements["userName"].value,
          password: form.elements["password"].value,
          //confirmPassword: form.elements["confirmPassword"].value,
          country: form.elements["country"].value,
          mobileNo: form.elements["mobile"].value,
          //agreeTerms: form.elements["agreeTerms"].checked,
        };
        console.log("formData:", formData);
        // Call your onSubmit function with the form data
        onSubmit(formData);
        setValidated(true);
      } else {
        // User clicked "Cancel," do not proceed
        event.preventDefault();
        setValidated(false);
      }
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    checkPasswordsMatch(event.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    checkPasswordsMatch(password, event.target.value);
  };

  const checkPasswordsMatch = (password, confirmPassword) => {
    setPasswordsMatch(password === confirmPassword);
  };

  const handleMobileBlur = () => {
    if (country && countryCodes[country]) {
      // Check if the mobile number already has the country code
      if (!mobile.startsWith(countryCodes[country])) {
        setMobile(countryCodes[country] + mobile);
      }
    }
  };

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/api/users/register", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div>
      <div
        className="wrapper1"
        style={{ backgroundImage: "url(/images/shelf.jpg)" }}
      >
        <div className="wrap1">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  defaultValue="Kamal"
                  name="firstName"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  defaultValue="Perera"
                  name="lastName"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={handleEmailChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    name="userName"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={handlePasswordChange}
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                {!passwordsMatch && (
                  <Form.Text className="text-danger">
                    Passwords do not match.
                  </Form.Text>
                )}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  as="select"
                  value={country}
                  name="country"
                  onChange={handleCountryChange}
                  required
                >
                  <option value="" disabled>
                    Select a country
                  </option>
                  <option value="Italy">Italy</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                </Form.Control>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobile}
                  name="mobile"
                  onChange={handleMobileChange}
                  onBlur={handleMobileBlur}
                  pattern="\+?[0-9]{10,14}" // Specify the pattern for a 10-digit number
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter valid phone Number
                </Form.Control.Feedback>
              </Col>
            </Row>
            <div className="centered-container">
              <Form.Group className="mb-3 d-flex justify-content-center align-items-center">
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                />
              </Form.Group>
            </div>
            <div className="centered1-container">
              <Button type="submit" variant="success">
                Create Account
              </Button>{" "}
            </div>
          </Form>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Sign;

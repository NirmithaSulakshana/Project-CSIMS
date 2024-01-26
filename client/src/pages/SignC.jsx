import React, { useState } from 'react';
import { Form, Col, InputGroup, Button, Row } from 'react-bootstrap';
import "../components/styles/SignC.css";
import Footer from '../components/Footer';

const countryCodes = {
  'Italy': '+39',
  'Sri Lanka': '+94',
  // Add more country codes as needed
};

function Sign() {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');

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
      setMobile('');
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || !passwordsMatch) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
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
      setMobile(countryCodes[country] + mobile);
    }
  };

  return (
    <div>
      <div className="wrapper1" style={{ backgroundImage: 'url(/images/shelf.jpg)' }}>
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
                  onChange={handleCountryChange}
                  required
                >
                  <option value="" disabled>Select a country</option>
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
                  onChange={handleMobileChange}
                  onBlur={handleMobileBlur}
                  pattern="[0-9]{10}" // Specify the pattern for a 10-digit number
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
              <Button type="submit" variant="success">Create Account</Button>{' '}
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

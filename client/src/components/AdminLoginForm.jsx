import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./styles/loginForm.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSuccessToast, showErrorToast } from "./ToasterMessage";

function AdminLogInForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (userType) => {
    axios
      .post("http://localhost:3001/api/admin/login", {
        email,
        password,
        userType,
      })
      .then((response) => {
        if (response.status === 200) {
          const accessToken = response.data.accessToken;
          localStorage.setItem("accessToken", accessToken);

          showSuccessToast("Successfully logged in");
          setTimeout(() => {
            if (userType === "admin") {
              navigate("/AdminPage");
            } else if (userType === "sales manager") {
              navigate("/SalesManagerPage");
            }
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error login:", error);
        showErrorToast("Error While Logging");
      });
  };

  return (
    <div
      className="lg-main"
      style={{ backgroundImage: "url(/images/beet.jpg)" }}
    >
      <div className="lg-head">
        <h1>Log In</h1>
        <div>
          <img
            src="images/login1.jpg"
            alt="login"
            className="ft1-img"
            style={{ height: 250, width: 250 }}
          />
        </div>
      </div>
      <div className="lg-head">
        <table className="lg-table">
          <tr>
            <td>
              {" "}
              <Form.Label>Email:</Form.Label>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>
            </td>
          </tr>
          <tr>
            <td>
              <Form.Label>Password:</Form.Label>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                Don't have any account
                <br />
                <Link to="/AdminSignup" style={{ color: "blue" }}>
                  Create Account
                </Link>
              </p>
            </td>
          </tr>

          <tr>
            <td>
              <Button variant="success" onClick={() => handleLogin("admin")}>
                Login
              </Button>{" "}
              <Button
                variant="success"
                onClick={() => handleLogin("sales manager")}
              >
                Slogin
              </Button>{" "}
              <Button variant="primary" onClick={onClose}>
                Close
              </Button>
            </td>
          </tr>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AdminLogInForm;

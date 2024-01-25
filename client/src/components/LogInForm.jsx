import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./styles/loginForm.css";

function LogInForm({ onClose }) {
  return (
    <div className="lg-main">
      <div className="lg-head">
        <h1>Log In</h1>
      </div>
      <div className="lg-head">
        <table className="lg-table">
          <tr>
            <td>
              {" "}
              <Form.Label>User Name:</Form.Label>
              <FloatingLabel
                controlId="floatingInput"
                label="User Name"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="User Name" />
              </FloatingLabel>
            </td>
          </tr>
          <tr>
            <td>
              <Form.Label>Password:</Form.Label>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </td>
          </tr>
        </table>
      </div>
      <div className="lg-head">
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default LogInForm;

import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./styles/loginForm.css";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function AdminLogInForm({ onClose }) {
  const Navigate = useNavigate();
  return (
    <div className="lg-main"  style={{ backgroundImage: 'url(/images/beet.jpg)' }} >
      
      <div className="lg-head" >
        <h1>Log In</h1>
       <div>
       <img src="images/login1.jpg" alt="login" className="ft1-img" style={{ height: 250, width: 250 }} />
      </div>

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
          <tr>
            <td>
            <p>
              Don't have any account<br/>
              <Link to="/AdminSignup">Create Account</Link>
            </p>
            </td>
          </tr>
        
        <tr>
        <td>
        <Button variant="success" onClick={() => Navigate("/AdminPage")}>Login</Button>
            <Button  variant="primary"onClick={onClose}>Close</Button>
        </td>
        </tr>
        </table>
      </div>
     
    </div>
  );
}

export default AdminLogInForm;

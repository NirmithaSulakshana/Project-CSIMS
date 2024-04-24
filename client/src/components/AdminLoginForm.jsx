import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./styles/loginForm.css";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';
import { showSuccessToast, showErrorToast } from "../components/ToasterMessage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AdminLogInForm({ onClose }) {
  const navigate = useNavigate();
  const [username, setusername ] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async () => {
    axios
      .post("http://localhost:3001/api/admin/alogin", {username,password,})
      .then((response) => {
        //console.log(response);
        if (response.status === 200) {
          //alert("Succesfully loged in ");
          const accessToken = response.data.accessToken;
          localStorage.setItem("accessToken", accessToken);

          showSuccessToast("Succesfully loged in");
          setTimeout(() => {
            navigate("/AdminPage");
          }, 2000);
        }
      })
      .catch((error) => {
        console.error("Error login:", error);
        showErrorToast("Error While Logging");
      });
  };
 

  

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
              <FloatingLabel onChange={(e) => setusername(e.target.value)}
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
              <FloatingLabel onChange={(e) => {setpassword(e.target.value)}} controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
            </td>
          </tr>
          <tr>
            <td>
            <p>
              Don't have any account<br/>
              <Link to="/AdminSignup" style={{ color: 'blue' }}>Create Account</Link>
            </p>
            </td>
          </tr>
        
        <tr>
        <td>
        <Button variant="success" onClick={handleLogin}>Login</Button>{" "}
        <Button variant="success" onClick={() => navigate("/SalesManagerPage")}>Slogin</Button>{" "}
            <Button  variant="primary"onClick={onClose}>Close</Button>
        </td>
        </tr>
        </table>
        
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminLogInForm;

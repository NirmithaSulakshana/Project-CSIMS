import "../components/styles/AdminSignup.css";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Footer from "../components/Footer";

const AdminSignupC = () => {
  const [userType, setUserType] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
    nic: "",
    email: "",
    mobileno: "",
    admincode: "", // You may include additional fields for admin
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
    nic: "",
    email: "",
    mobileno: "",
    admincode: "",
  });

  const handleUserTypeChange = (event) => {
    const selectedUserType = event.target.value;
    setUserType(selectedUserType);

    // Clear form data when user type changes
    setFormData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
      nic: "",
      email: "",
      mobileno: "",
      admincode: "",
    });

    setErrors({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
      nic: "",
      email: "",
      mobileno: "",
      admincode: "",
    });

    // Optionally, you may want to perform additional actions based on the user type
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    let error = "";
    if (name === "username" && !value) {
      error = "Username is required";
    } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "Invalid email address";
    } else if (name === "password" && value.length < 12) {
      error = "Need at least 12 characters";
    } else if (name === "confirmpassword" && value !== formData.password) {
      error = "Passwords do not match";
    } else if (name === "nic" && !value) {
      error = "NIC is required";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userType) {
      console.error("Please select a user type");
      return;
    }

    if (userType === "admin" && !formData.admincode) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        admincode: "Admin Code is required for admin users",
      }));
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userType: userType,
          admincode: formData.admincode || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Reset form fields after successful submission
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpassword: "",
        nic: "",
        email: "",
        mobileno: "",
        admincode: "",
      });

      // Optionally, you can provide feedback to the user about successful registration
      console.log("Admin account created successfully");
    } catch (error) {
      console.error("Error creating admin account", error);
      // Handle error (e.g., display error message to the user)
    }
  };
  

  return (
    <div className="container1">
      <div className="contentc">
        <img src="images/shelf.jpg" alt="alter" />
        <div className="shape">
          <div className="signup">Sign Up</div>
          <div className="inputs">
            <div className="input">
              <FormControl>
                <div className="user">
                  <label>User Type</label>
                </div>
                <div>
                  <Select
                    value={userType}
                    onChange={handleUserTypeChange}
                    style={{
                      backgroundColor: "#ffffff",
                      width: "280px",
                      height: "35px",
                      borderRadius: "9px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Choose User Type</em>
                    </MenuItem>
                    <MenuItem value="sales manager">Sales Manager</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </div>
              </FormControl>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="input">
                <div className="type">
                  <label>First Name</label>
                </div>

                <TextField
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={handleFormChange}
                  placeholder="Type here"
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      color: "black",
                      width: "280px",
                      borderRadius: "9px",
                      height: "35px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                />
              </div>

              <div className="input">
                <div className="username">
                  <label>User Name</label>
                </div>
                <TextField
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleFormChange}
                  error={!!errors.username}
                  helperText={errors.username}
                  placeholder="Type here"
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      color: "black",
                      width: "280px",
                      borderRadius: "9px",
                      height: "35px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                />
              </div>
              <div className="input">
                <div className="password">
                  <label>Password</label>
                </div>
                <TextField
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  placeholder="Type here"
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      color: "black",
                      width: "280px",
                      borderRadius: "9px",
                      height: "35px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                />
              </div>
              <div className="input">
                <div className="nic">
                  <label>NIC</label>
                </div>
                <TextField
                  name="nic"
                  type="text"
                  value={formData.nic}
                  onChange={handleFormChange}
                  error={!!errors.nic}
                  helperText={errors.nic}
                  placeholder="Type here"
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      color: "black",
                      width: "280px",
                      borderRadius: "9px",
                      height: "35px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                />
              </div>
              <div className="input">
                <div className="email">
                  <label>Email</label>
                </div>
                <TextField
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  placeholder="Type here"
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      color: "black",
                      width: "280px",
                      borderRadius: "9px",
                      height: "35px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                />
              </div>

              <div className="inputs1">
                <div className="input1">
                  <div className="lastname">
                    <label>Last Name</label>
                  </div>

                  <TextField
                    name="lastname"
                    type="text"
                    value={formData.lastname}
                    onChange={handleFormChange}
                    placeholder="Type here"
                    InputProps={{
                      style: {
                        backgroundColor: "white",
                        color: "black",
                        width: "280px",
                        borderRadius: "9px",
                        height: "35px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                      },
                    }}
                  />
                </div>

                <div className="input1">
                  <div className="confirmpassword">
                    <label>Confirm Password</label>
                  </div>

                  <TextField
                    name="confirmpassword"
                    type="password"
                    value={formData.confirmpassword}
                    onChange={handleFormChange}
                    error={!!errors.confirmpassword}
                    helperText={errors.confirmpassword}
                    placeholder="Type here"
                    InputProps={{
                      style: {
                        backgroundColor: "white",
                        color: "black",
                        width: "280px",
                        borderRadius: "9px",
                        height: "35px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                      },
                    }}
                  />
                </div>

                <div className="input1">
                  <div className="mobileno">
                    <label>Mobile No</label>
                  </div>

                  <TextField
                    name="mobileno"
                    type="tel"
                    value={formData.mobileno}
                    onChange={handleFormChange}
                    placeholder="(+94)-0000000"
                    InputProps={{
                      style: {
                        backgroundColor: "white",
                        color: "black",
                        width: "280px",
                        borderRadius: "9px",
                        height: "35px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                      },
                    }}
                  />
                </div>
              </div>

              <div className="inputs4">
                <div className="input4">
                  {userType === "admin" && (
                    <>
                      <InputLabel
                        htmlFor="admincode"
                        sx={{
                          mt: 2,
                          display: "block",
                          color: "black",
                          fontSize: "15.25px",
                        }}
                      >
                        Admin Code
                      </InputLabel>
                      <TextField
                        label=""
                        name="admincode"
                        type="text"
                        value={formData.admincode}
                        onChange={handleFormChange}
                        error={!!errors.admincode}
                        helperText={errors.admincode}
                        placeholder="Type here"
                        InputProps={{
                          style: {
                            backgroundColor: "white",
                            color: "black",
                            width: "280px",
                            borderRadius: "9px",
                            height: "35px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                          },
                        }}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="button">
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!userType}
                  color="secondary"
                  style={{
                    textTransform: "none",
                    backgroundColor: "green",
                    color: "white",
                    fontSize: "17px",
                  }}
                  sx={{
                    borderRadius: "9px",
                  }}
                >
                  Create an Account
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div></div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminSignupC;

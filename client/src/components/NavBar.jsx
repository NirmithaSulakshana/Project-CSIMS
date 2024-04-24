import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import VerticalAlignTopSharpIcon from "@mui/icons-material/VerticalAlignTopSharp";
import { useState, useEffect } from "react";
import "./styles/navBar.css";
import {jwtDecode} from 'jwt-decode';
function NavBar() {

let token = localStorage.getItem("accessToken");
let user = jwtDecode.decode(token);
console.warn(user);

  


  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`bg-body-tertiary navbar ${isSticky ? "sticky" : ""}`}
    >
      <Container fluid>
        <Navbar.Brand href="#">
          <VerticalAlignTopSharpIcon />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/AboutUs">About Us</Nav.Link>
            {!localStorage.getItem("accessToken") && (
              <>
                
              </>
            )}
            <NavDropdown title="Login" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/LogIn">User Login</NavDropdown.Item>
              <NavDropdown.Item href="/AdminLoginForm">
                Admin Login
              </NavDropdown.Item>
              <NavDropdown.Divider />
              
            </NavDropdown>
          </Nav>
          <Nav>
              <NavDropdown title="user name">
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

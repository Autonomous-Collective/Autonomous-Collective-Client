import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from "./Login";
import Register from "./Register";
import {Link} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  return (
    <>
    <style type ="text/css">
      
    </style>
    <Navbar bg="light" expand="lg">
      <Container id="navbar-container">
        <Navbar.Brand href="/">The Autonomous Collective</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse >
          <div id="navbar-links">
            <Nav >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <Login/>
              <Register/>
              {/* <NavDropdown title="Dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
              <Link className="material-symbols-outlined">
                shopping_cart
              </Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default NavBar

  
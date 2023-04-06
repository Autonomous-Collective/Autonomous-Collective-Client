import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Login from "./Login";
import Register from "./Register";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = (props) => {
  const email = props.email;
  const setEmail = props.setEmail;
  const password = props.password;
  const setPassword = props.setPassword;
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const user = props.user
  const setUser = props.setUser

  return (
    <>
      <style type="text/css">
        {`
      #navbar-container{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap:wrap;
      }
      `}
      </style>
      <Navbar bg="light" expand="sm" id="navbar-container" sticky="top">
        {/* <Container id="navbar-container"> */}
        <div>
          <Navbar.Brand href="/" id="brand">
            The Autonomous Collective
          </Navbar.Brand>
        </div>
        <div id="navbar-links">
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#link">Profile</Nav.Link>

              {isLoggedIn ? (
                <Nav.Link
                  id={"logoutLink"}
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("email");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setEmail("")
                    setToken("")
                    setUser("")
                    // navigate("/", { replace: true });
                    // window.location.reload(true);
                  }}
                  className="navButton"
                >
                  Log Out
                </Nav.Link>
              ) : (
                <Login
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  user={user}
                  setUser={setUser}
                />
              )}
              <Register
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
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
              <Link className="material-symbols-outlined">shopping_cart</Link>
            </Nav>
          </Navbar.Collapse>
        </div>
        {/* </Container> */}
      </Navbar>
    </>
  );
};

export default NavBar;

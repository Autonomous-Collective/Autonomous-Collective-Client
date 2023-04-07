import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Login from "./Login";
import Register from "./Register";
import { Link, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = (props) => {
  const email = props.email;
  const setEmail = props.setEmail;
  const password = props.password;
  const setPassword = props.setPassword;
  const isLoggedIn = props.isLoggedIn;
  const setIsLoggedIn = props.setIsLoggedIn;
  const user = props.user;
  const setUser = props.setUser;
  const token = props.token;
  const setToken = props.setToken;

  const verifyAdmin = user.isAdmin;
  const verifyGuest = user.isGuest;
  //guest navbar => register logout shoppingcart
  const navigate = useNavigate();

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
              { isLoggedIn && verifyAdmin ?
              <Nav.Link href="/admin">Admin</Nav.Link>: null }

              {isLoggedIn && !verifyGuest ?
              <Nav.Link href="/profile">Profile</Nav.Link> : null
              }

              {isLoggedIn ? (
                <>
                <Nav.Link
                  id={"logoutLink"}
                  onClick={() => {
                    setIsLoggedIn(false);
                    localStorage.removeItem("email");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setEmail("");
                    setToken("");
                    setUser("");
                    navigate("/");
                  }}
                  className="navButton"
                >
                  Log Out
                </Nav.Link>
                </>
              ) : (
                <>
                <Login
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  user={user}
                  setUser={setUser}
                  token={token}
                  setToken={setToken}
                />
                <Register
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  user={user}
                  setUser={setUser}
                  token={token}
                  setToken={setToken}
                />
                </>
                )}
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
              <Link className="material-symbols-outlined" to="/cart">shopping_cart</Link>
            </Nav>
          </Navbar.Collapse>
        </div>
        {/* </Container> */}
      </Navbar>
    </>
  );
};

export default NavBar;

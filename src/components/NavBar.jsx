import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Login from "./Login";
import Register from "./Register";
import { Link, useLocation, useNavigate } from "react-router-dom";

import GuestRegister from "./GuestRegister";

import "bootstrap/dist/css/bootstrap.min.css";

import navStyling from "./componentStyles/navStyling.css"

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

  const navigate = useNavigate();

  const locationHook = useLocation();

  return (
    <>
      <Navbar
        style={{ justifyContent: "space-evenly" }}
        bg="light"
        expand="sm"
        id="navbar-container"
        className="gap-20 px-3"
        sticky="top"
      >
        <div>
          <Navbar.Brand as={Link} to="/" id="brand">
            THE AUTONOMOUS COLLECTIVE
          </Navbar.Brand>
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Container style={{ marginRight: "0px", paddingRight: "0px" }} id="navSection">
            <Nav style={{ justifyContent: "flex-end" }}>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {verifyGuest ? (
                <GuestRegister
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
              ) : null}
              {isLoggedIn && verifyAdmin ? (
                <>
                  <Nav.Link as={Link} to="/admin">
                    Admin
                  </Nav.Link>
                  {locationHook.pathname === "/admin" ? (
                    <NavDropdown title="Shortcuts" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#addProductContainer">
                        Products
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#tags-section">
                        Tags
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#adminUserCard">
                        Users
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : null}
                </>
              ) : null}

              {isLoggedIn && !verifyGuest ? (
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
              ) : null}

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
              <Link className="material-symbols-outlined" to="/cart">
                <i className="material-icons">shopping_cart</i>
              </Link>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;

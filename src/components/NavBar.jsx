import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Login from "./Login";
import Register from "./Register";
import { Link, useNavigate } from "react-router-dom";

import  navbarStyling  from "./componentStyles/navbarStyling.css"

import GuestRegister from "./GuestRegister";

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
        padding-left: 15px;
        padding-right: 15px
        
      }
      `}
      </style>
      <Navbar bg="light" expand="sm" id="navbar-container" sticky="top">
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
              {verifyGuest ? 
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
                  setToken={setToken}/> : null}
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
              {/* <Link className="material-symbols-outlined" to="/cart">shopping_cart</Link> */}
              <Link to="/cart"><i className="material-symbols-outlined">shopping_cart</i></Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default NavBar;

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { userLoginCall } from "../API-Adapter";

// import Register from "./Register";

const Login = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const email = props.email;
  const setEmail = props.setEmail;
  const password = props.password;
  const setPassword = props.setPassword;
  const setIsLoggedIn = props.setIsLoggedIn;

  const navigate = useNavigate();

  return (
    <>
    <div
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          if (localStorage.getItem("token")) {
            alert("Already logged in!");
          } else {
            const result = await userLoginCall(email, password);
            if (result !== undefined) {
              setIsLoggedIn(true);
              localStorage.setItem("token", result.token);
              localStorage.setItem("username", email);
              localStorage.setItem("user", JSON.stringify(result.user))
              handleClose();
            } else {
              console.log("Invalid Login Credentials");
            }
          }
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <Nav.Link variant="primary" onClick={handleShow} className="nav-modal">
        Login
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>
            <div className="login-buttons">
              <Button variant="primary" type="submit">
                Submit
              </Button>
{/* use an onClick here to handle guest user login */}
              <Button variant="primary" type="button">
                Or Continue as Guest
              </Button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <p> Don't have an account? </p>
          <Button variant="primary">      
            Register Here
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { registerNewUserCall, guestLoginCall } from "../API-Adapter";
import MessageAlert from "./MessageAlert";

const Register = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const email = props.email;
  const setEmail = props.setEmail;
  const password = props.password;
  const setPassword = props.setPassword;
  const setIsLoggedIn = props.setIsLoggedIn;
  const user = props.user;
  const setUser = props.setUser;
  const token = props.Token;
  const setToken = props.setToken;

  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      <div
        id="registerPage"
        onSubmit={async (event) => {
          event.preventDefault();
          if (password !== confirmPassword) {
            setMessage("Both password fields must match!");
            setIsError(true);
          } else
            try {
              if (localStorage.getItem("token")) {
                setMessage("Need to log out before creating a new account");
                setIsError(true);
              } else {
                const result = await registerNewUserCall(name, email, password);
                if (result.success) {
                  setMessage("Successfully Registered!");
                  setIsError(false);

                  setIsLoggedIn(true);
                  localStorage.setItem("token", result.token);
                  localStorage.setItem("email", email);
                  localStorage.setItem("user", JSON.stringify(result.user));
                  setToken(result.token);
                  setEmail(email);
                  setUser(result.user);
                  handleClose();
                } else {
                  setMessage(
                    "Unable to Register your account, email may already be used"
                  );
                  setIsError(true);
                }
              }
            } catch (error) {
              console.error(error);
            }
        }}
      >
        <Nav.Link variant="primary" onClick={handleShow} className="nav-modal">
          Register
        </Nav.Link>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form id="register-form">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  required
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

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
                <Form.Text>Password must be at least 8 characters</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={confirmPassword}
                  required
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
              </Form.Group>
              <div className="login-buttons">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={async (event) => {
                    event.preventDefault();
                    try {
                      if (localStorage.getItem("token")) {
                        alert("Already logged in!");
                      } else {
                        const result = await guestLoginCall();
                        if (result !== undefined) {
                          setMessage("Logged in as Guest");
                          setIsError(false);

                          localStorage.setItem("token", result.token);
                          localStorage.setItem("email", result.guestUser.email);
                          localStorage.setItem(
                            "user",
                            JSON.stringify(result.guestUser)
                          );
                          setToken(result.token);
                          setEmail(result.guestUser.email);
                          setUser(result.guestUser);
                          setIsLoggedIn(true);
                          handleClose();
                        } else {
                          setMessage("Unable to register as guest");
                          setIsError(true);
                        }
                      }
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  Or Continue as Guest
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Register;

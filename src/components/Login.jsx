import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { userLoginCall, guestLoginCall } from "../API-Adapter";
import MessageAlert from "./MessageAlert";

const Login = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const email = props.email;
  const setEmail = props.setEmail;
  const password = props.password;
  const setPassword = props.setPassword;
  const setIsLoggedIn = props.setIsLoggedIn;
  const setUser = props.setUser;
  const setToken = props.setToken;

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      <div
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            if (localStorage.getItem("token")) {
              setMessage("Already logged in!");
              setIsError(true);
            } else {
              const result = await userLoginCall(email, password);

              if (result.success) {
                setMessage("Successfully Logged In!");
                setIsError(false);

                localStorage.setItem("token", result.token);
                localStorage.setItem("email", email);
                localStorage.setItem("user", JSON.stringify(result.user));
                setToken(result.token);
                setEmail(email);
                setUser(result.user);
                setIsLoggedIn(true);
                handleClose();
              } else {
                setMessage("Invalid Login Credentials");
                setIsError(true);
              }
            }
          } catch (error) {
            console.error(error);
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
                    event.preventDefault();
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
                    event.preventDefault();
                    setPassword(event.target.value);
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
                        setMessage("Already logged in!");
                        setIsError(true);
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
                      console.log(error);
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

export default Login;

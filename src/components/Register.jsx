import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { registerNewUserCall } from "../API-Adapter";

const Register = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const email = props.email;
  const setEmail = props.setEmail;
  const password = props.password;
  const setPassword = props.setPassword;
  const setIsLoggedIn = props.setIsLoggedIn;

  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <div
        id="registerPage"
        onSubmit={async (event) => {
          event.preventDefault();
          if (password !== confirmPassword) {
            alert("Both password fields must match!");
          } else
            try {
              if (localStorage.getItem("token")) {
                alert("Need to log out before creating a new account");
              } else {
                const result = await registerNewUserCall(name, email, password);
                if (result !== undefined) {
                  setIsLoggedIn(true);
                  localStorage.setItem("token", result.token);
                  localStorage.setItem("username", email);
                  localStorage.setItem("user", JSON.stringify(result.user));
                  handleClose();
                } else {
                  console.log("token came back undefined");
                }
              }
            } catch (error) {
              console.log(error);
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
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default Register;

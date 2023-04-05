import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from 'react-bootstrap/Nav';

// import Register from "./Register";

const Login = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
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
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <div className ="login-buttons">
              <Button variant="primary" type="submit">
                Submit
              </Button>

              <Button variant="primary" type="submit">
                Or Continue as Guest
              </Button>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <p> Don't have an account? </p>
          <Button variant="primary" onClick={<Register/>}>      
            Register Here
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import {editUserInfoCall} from "../API-Adapter";

// import Register from "./Register";

const GuestRegister = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [confirmUpdatePassword, setConfirmUpdatePassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

//   const email = props.email;
  const setEmail = props.setEmail;
//   const password = props.password;
//   const setPassword = props.setPassword;
  const setIsLoggedIn = props.setIsLoggedIn;
  const setUser = props.setUser;
  const token = props.token;

  
  const editUserInfo = async(token, updateName, updateEmail, updatePassword) => {
      const isGuest =  false; //sets isGuest to false every time bc a guest is registering
      try{
        const result = await editUserInfoCall(token, updateName, updateEmail, updatePassword, isGuest);
        if(result.success){
            localStorage.setItem("email", result.user.email);
            localStorage.setItem("user", JSON.stringify(result.user));
            // setToken(result.token);
            setEmail(result.user.email);
            setUser(result.user);
            setIsLoggedIn(true);
            handleClose();
        }
    } catch(error){
        console.error(error);
    }
  }

  return (
    <>
      <div
        onSubmit={async (event) => {
            event.preventDefault();
            if(updatePassword !== confirmUpdatePassword) {
                alert("Both password fields must match!");
            } else {
                editUserInfo(token, updateName, updateEmail, updatePassword);
            }
        }}
      >
        <Button
          href="#"
          variant="secondary"
          onClick={handleShow}
          className="nav-modal"
        >
          Register
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label> Name: </Form.Label>
                <Form.Control type="text" value={updateName} placeholder="Enter Name" required onChange={(event) => {
                    setUpdateName(event.target.value);
                }}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> Email Address: </Form.Label>
                <Form.Control type="email" value={updateEmail} placeholder="Enter Email"  required onChange={(event) => {
                    setUpdateEmail(event.target.value);
                }}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> Password: </Form.Label>
                <Form.Control type="password" value={updatePassword} placeholder="Enter Password" required onChange={(event) => {
                    setUpdatePassword(event.target.value);
                }}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmBasicPassword">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmUpdatePassword}
                  required
                  onChange={(event) => {
                    setConfirmUpdatePassword(event.target.value);
                  }}
                />
              </Form.Group>
                <Button variant="success" type="submit">
                  Submit
                </Button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default GuestRegister;
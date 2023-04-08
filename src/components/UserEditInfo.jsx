import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import { editUserInfoCall } from "../API-Adapter";
import { MessageAlert } from "./";

// import Register from "./Register";

const UserEditInfo = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [confirmUpdatePassword, setConfirmUpdatePassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const token = props.token;

  const editUserInfo = async (
    token,
    updateName,
    updateEmail,
    updatePassword
  ) => {
    try {
      const result = await editUserInfoCall(
        token,
        updateName,
        updateEmail,
        updatePassword
      );
      if (result.success) {
        handleClose();
        setMessage("Succesfully edited user info");
        setIsError(false);
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      } else {
        handleClose();
        setMessage("Error editing user info");
        setIsError(true);
        setTimeout(() => {
          window.location.reload();
        }, 3500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      <div
        onSubmit={async (event) => {
          event.preventDefault();
          if (updatePassword !== confirmUpdatePassword) {
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
          Edit your info
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit your Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label> Update Name: </Form.Label>
                <Form.Control
                  type="text"
                  value={updateName}
                  placeholder="Enter New Name"
                  onChange={(event) => {
                    setUpdateName(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label> Update Email Address: </Form.Label>
                <Form.Control
                  type="email"
                  value={updateEmail}
                  placeholder="Enter New Email"
                  onChange={(event) => {
                    setUpdateEmail(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Update Password: </Form.Label>
                <Form.Control
                  type="password"
                  value={updatePassword}
                  placeholder="Enter New Password"
                  onChange={(event) => {
                    setUpdatePassword(event.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formConfirmBasicPassword">
                <Form.Label>Confirm New Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmUpdatePassword}
                  onChange={(event) => {
                    setConfirmUpdatePassword(event.target.value);
                  }}
                />
              </Form.Group>
              <div className="login-buttons">
                <Button variant="success" type="submit">
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

export default UserEditInfo;

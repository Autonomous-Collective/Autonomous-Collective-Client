import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";
import {editUserAddressCall, createUserAddressCall} from "../API-Adapter";

// import Register from "./Register";

const UserEditAddress = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateName, setUpdateName] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updateCity, setUpdateCity] = useState("");
  const [updateState, setUpdateState] = useState("");

  const token = props.token;
  const userAddress = props.userAddress 


  const editUserAddress = async(token, updateName, updateAddress, updateCity, updateState) => {
    try{
        const result = await editUserAddressCall(token, updateName, updateAddress, updateCity, updateState);
        if(result.success){
            handleClose();
            window.location.reload();
        }
    } catch(error){
        console.error(error);
    }
  }

  const createUserAddress = async (token, updateName, updateAddress, updateCity, updateState ) =>{
    try{
      const result = await createUserAddressCall(token, updateName, updateAddress, updateCity, updateState);
      if(result.success){
          handleClose();
          window.location.reload();
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
            if (userAddress) {
            editUserAddress(token, updateName, updateAddress, updateCity, updateState);
            } else {
              createUserAddress(token, updateName, updateAddress, updateCity, updateState)
            }
        }}
      >
        <Button
          href="#"
          variant="secondary"
          onClick={handleShow}
          className="nav-modal"
        >
          Edit your Address
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit your Shipping Address</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label> Update Shipping Name: </Form.Label>
                <Form.Control type="text" value={updateName} placeholder="Enter New Name" onChange={(event) => {
                    setUpdateName(event.target.value);
                }}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label> Update Address: </Form.Label>
                <Form.Control type="text" value={updateAddress} placeholder="Enter New Address" onChange={(event) => {
                    setUpdateAddress(event.target.value);
                }}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCity">
                <Form.Label>Update City: </Form.Label>
                <Form.Control type="text" value={updateCity} placeholder="Enter New City" onChange={(event) => {
                    setUpdateCity(event.target.value);
                }}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicState">
                <Form.Label>Confirm New State:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter New State"
                  value={updateState}
                  onChange={(event) => {
                    setUpdateState(event.target.value);
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

export default UserEditAddress;
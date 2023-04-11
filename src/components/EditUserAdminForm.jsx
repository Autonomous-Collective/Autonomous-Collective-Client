import React, { useState } from "react";
import { adminEditUserCall } from "../API-Adapter";
import { MessageAlert } from "./";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditUserAdminForm = ({
  token,
  name,
  email,
  isAdmin,
  isActive,
  userId,
}) => {
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [NewIsAdmin, setNewIsAdmin] = useState(isAdmin);
  const [NewIsActive, setNewIsActive] = useState(isActive);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState(false);

  const adminEditUser = async () => {
    const response = await adminEditUserCall(
      token,
      userId,
      newName,
      newEmail,
      NewIsAdmin,
      NewIsActive
    );
    if (response.success) {
      setMessage("Success editing user");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } else {
      setMessage("Error editing user");
      setIsError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  };

  return (
    <div>
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          adminEditUser();
        }}
      >
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          defaultValue={name}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        ></Form.Control>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="text"
          defaultValue={email}
          onChange={(e) => {
            setNewEmail(e.target.value);
          }}
        ></Form.Control>
        <Form.Label>isAdmin</Form.Label>

        {isAdmin ? (
          <Form.Select
            value={true}
            onChange={(e) => {
              setNewIsAdmin(e.target.value);
            }}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Select>
        ) : (
          <Form.Select
            value={false}
            onChange={(e) => {
              setNewIsAdmin(e.target.value);
            }}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Select>
        )}

        <Form.Label>isActive</Form.Label>
        {isActive ? (
          <Form.Select
            value={true}
            onChange={(e) => {
              setNewIsActive(e.target.value);
            }}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Select>
        ) : (
          <Form.Select
            value={false}
            onChange={(e) => {
              setNewIsAdmin(e.target.value);
            }}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </Form.Select>
        )}

        <Button
          style={{ marginTop: "20px", marginBottom: "20px" }}
          variant="success"
          type="submit"
        >
          submit changes
        </Button>
      </Form>
    </div>
  );
};

export default EditUserAdminForm;

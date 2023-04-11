import React, { useState } from "react";
import { editTagCall } from "../API-Adapter";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MessageAlert from "./MessageAlert";

const EditTagForm = ({ token, tagId }) => {
  const [newTagName, setNewTagName] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const editTag = async () => {
    const response = await editTagCall(token, tagId, newTagName);
    if (response.success) {
      setMessage("The tag was successfully edited!");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      setMessage("Something went wrong");
      setIsError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        editTag();
      }}
    >
      {message ? <MessageAlert isError={isError} message={message} /> : null}
      <Form.Label style={{ marginTop: "10px" }}>New Tag Name:</Form.Label>
      <Form.Control
        type="text"
        onChange={(e) => {
          setNewTagName(e.target.value);
        }}
      />
      <Button variant="success" style={{ marginTop: "20px" }} type="submit">
        Change Tag!
      </Button>
    </Form>
  );
};

export default EditTagForm;

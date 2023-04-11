import React, { useState } from "react";
import { addAProductCall } from "../API-Adapter";
import { MessageAlert } from "./";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

const AddProductForm = ({ token }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [inventory, setInventory] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");



  const addAProduct = async () => {
    const response = await addAProductCall(
      token,
      title,
      author,
      isbn,
      description,
      price,
      imageUrl,
      inventory
    );
    if (response.success) {
      setMessage("You have successfully added a product");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    } else {
      setMessage("Something went wrong adding your product");
      setIsError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  };

  return (
    <>
      {message ? <MessageAlert message={message} isError={isError} /> : null}
    <Card style={{width: "60vw", padding: "20px"}}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addAProduct();
        }}
        className=""
      >
        <Form.Label>Title</Form.Label>
        <Form.Control style={{ marginBottom: "10px" }} 
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Form.Label>Author</Form.Label>
        <Form.Control style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          type="text"
        />
        <Form.Label>ISBN</Form.Label>
        <Form.Control style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setIsbn(e.target.value);
          }}
          type="text"
        />
        <Form.Label>Description</Form.Label>
        <Form.Control style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          rows="5"
          cols="20"
        />
        <Form.Label>Price(in pennies)</Form.Label>
        <Form.Control style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          type="number"
        />
        <Form.Label>Image URL</Form.Label>
        <Form.Control style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
          type="text"
        />
        <Form.Label>Inventory</Form.Label>
        <Form.Control style={{ marginBottom: "10px" }}
          onChange={(e) => {
            setInventory(e.target.value);
          }}
          type="number"
        />
        <Button style={{ marginTop: "20px", marginBottom: "20px" }} variant="success" type="submit">Submit New Product</Button>
      </Form>
      </Card>
    </>
  );
};

export default AddProductForm;

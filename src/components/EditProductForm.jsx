import React, { useState } from "react";
import { editProductCall } from "../API-Adapter";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const EditProductForm = ({ product, token }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [inventory, setInventory] = useState("");
  const [isError, setIsError] = useState(false);
  const editProduct = async () => {
    const response = await editProductCall(
      token,
      product.id,
      title,
      author,
      isbn,
      description,
      price,
      imageUrl,
      inventory
    );
    if (response.success) {
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (

    <div>
    {/* <Form.Label>Title</Form.Label>
    <Form.Control type="text" onChange={(e) => {
          setTitle(e.target.value);
        }}
        defaultValue={product.title}
        ></Form.Control> */}
    <Form
      style={{width:"909px", margin:"20px"}}
      onSubmit={(e) => {
        e.preventDefault();
        editProduct();
      }}
    >
      <Form.Label>Title</Form.Label>
      <Form.Control
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        defaultValue={product.title}
        type="text"
      />
      <Form.Label>Author</Form.Label>
      <Form.Control
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
        defaultValue={product.author}
        type="text"
      />
      <Form.Label>ISBN</Form.Label>
      <Form.Control
        onChange={(e) => {
          setIsbn(e.target.value);
        }}
        defaultValue={product.isbn}
        type="text"
      />
      <Form.Label>Description</Form.Label>
      <Form.Control
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        defaultValue={product.description}
        rows="5"
        cols="60"
      />
      <Form.Label>Price (in pennies)</Form.Label>
      <Form.Control
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        defaultValue={product.price}
        type="text"
      />
      <Form.Label>Image URL</Form.Label>
      <Form.Control
        onChange={(e) => {
          setImageUrl(e.target.value);
        }}
        defaultValue={product.img}
        type="text"
      />
      <Form.Label>Inventory</Form.Label>
      <Form.Control
        onChange={(e) => {
          setInventory(e.target.value);
        }}
        defaultValue={product.inventory}
        type="number"
      />
      <Button style ={{marginTop:"20px"}} variant="success" type="submit">Submit Changes</Button>
    </Form>
    </div>
  );
};

export default EditProductForm;

import React, { useState } from "react";
import { addAProductCall } from "../API-Adapter";

const AddProductForm = ({ token }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [inventory, setInventory] = useState("");
  const [isError, setIsError] = useState(false);

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
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addAProduct();
      }}
      className="flex-column"
    >
      <label>Title</label>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label>Author</label>
      <input
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
        type="text"
      />
      <label>ISBN</label>
      <input
        onChange={(e) => {
          setIsbn(e.target.value);
        }}
        type="text"
      />
      <label>Description</label>
      <textarea
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        rows="5"
        cols="20"
      />
      <label>Price(in pennies)</label>
      <input
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        type="number"
      />
      <label>Image URL</label>
      <input
        onChange={(e) => {
          setImageUrl(e.target.value);
        }}
        type="text"
      />
      <label>Inventory</label>
      <input
        onChange={(e) => {
          setInventory(e.target.value);
        }}
        type="number"
      />
      <button type="submit">Submit New Product</button>
    </form>
  );
};

export default AddProductForm;

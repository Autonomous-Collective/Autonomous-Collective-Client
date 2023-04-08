import React, { useState } from "react";
import { editProductCall } from "../API-Adapter";

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
    <form
      className="flex-column"
      onSubmit={(e) => {
        e.preventDefault();
        editProduct();
      }}
    >
      <label>Title</label>
      <input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        defaultValue={product.title}
        type="text"
      />
      <label>Author</label>
      <input
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
        defaultValue={product.author}
        type="text"
      />
      <label>ISBN</label>
      <input
        onChange={(e) => {
          setIsbn(e.target.value);
        }}
        defaultValue={product.isbn}
        type="text"
      />
      <label>Description</label>
      <textarea
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        defaultValue={product.description}
        rows="5"
        cols="60"
      />
      <label>Price (in pennies)</label>
      <input
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        defaultValue={product.price}
        type="text"
      />
      <label>Image URL</label>
      <input
        onChange={(e) => {
          setImageUrl(e.target.value);
        }}
        defaultValue={product.img}
        type="text"
      />
      <label>Inventory</label>
      <input
        onChange={(e) => {
          setInventory(e.target.value);
        }}
        defaultValue={product.inventory}
        type="number"
      />
      <button type="submit">Submit Changes</button>
    </form>
  );
};

export default EditProductForm;

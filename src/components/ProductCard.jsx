import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import productCardStyling from "./componentStyles/productCardStyling.css";

const ProductCard = ({ product }) => {

  const productAuthor = product.author.toUpperCase();

  return (
    <Card style={{ width: "18rem", margin: "10px" }} id="product-card">
      <Card.Img
        variant="top"
        style={{
          padding: "20px",
          height: "400px",
          width: "275px",
          margin: "auto",
        }}
        src={product.img}

        id="product-card-img"
      />
      <Card.Body>
        <Card.Title id="product-card-title">{product.title}</Card.Title>
        <Card.Text id="product-card-author">{productAuthor}</Card.Text>
      </Card.Body>
      <Button
        style={{ width: "40%", marginLeft: "30%", marginBottom: "20px" }}
        variant="primary"
        as={Link}
        to={`/products/${product.id}`}
        id="product-card-button"
      >
        SEE MORE
      </Button>
    </Card>
  );
};

export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img
        variant="top"
        style={{
          padding: "20px",
          height: "400px",
          width: "275px",
          margin: "auto",
        }}
        src={product.img}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.author}</Card.Text>
      </Card.Body>
      <Button
        style={{ width: "40%", marginLeft: "30%", marginBottom: "20px" }}
        variant="primary"
        as={Link}
        to={`/products/${product.id}`}
      >
        See More
      </Button>
    </Card>
  );
};

export default ProductCard;

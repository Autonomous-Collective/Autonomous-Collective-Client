import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.img} alt="placeholder image" height="100" width="100" />
      <h4>{product.title}</h4>
      <p>by {product.author}</p>
      <Link to={`/products/${product.id}`}>
        <button>see more!</button>
      </Link>
    </div>
  );
};

export default ProductCard;

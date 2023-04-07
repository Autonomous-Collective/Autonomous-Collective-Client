import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" style={{padding: "20px"}} src={product.img} />
    <Card.Body>
      <Card.Title>{product.title}</Card.Title>
      <Card.Text>{product.author}</Card.Text>
      <Button variant="primary" to={`/products/${product.id}`}>See More</Button>
    </Card.Body>
  </Card>
);
}
  
  export default ProductCard;
  
  
  
 

// return (
//   <div className="product-card">
//     <img src={product.img} alt="placeholder image" height="100" width="100" />
//     <h4>{product.title}</h4>
//     <p>by {product.author}</p>
//     <Link to={`/products/${product.id}`}>
//       <button>see more!</button>
//     </Link>
//   </div>
// );
// };
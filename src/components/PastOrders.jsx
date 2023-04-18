import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const PastOrders = (props) => {
  const pastOrders = props.pastOrders;

  return (
    <div>
      {pastOrders === null ? (
        <div className="loader"></div>
      ) : pastOrders?.length ? (
        pastOrders.map((order, idx) => {
          let total = 0;
          return (
            <Card style={{ marginBottom: "20px" }} key={idx}>
              <Card.Header>Cart {`${idx + 1}`}</Card.Header>
              <div>
                {order.products.map((product, idx) => {
                  total += product.price * product.quantity;
                  return (
                    <Card.Body key={idx}>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>Quantity: {product.quantity}</Card.Text>
                      <Card.Text>Price: ${product.price / 100}</Card.Text>
                    </Card.Body>
                  );
                })}
              </div>
              <Card.Footer>Total: ${total / 100}</Card.Footer>
            </Card>
          );
        })
      ) : (
        <h1>You have not made any orders</h1>
      )}
    </div>
  );
};

export default PastOrders;

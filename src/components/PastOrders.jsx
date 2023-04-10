import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const PastOrders = (props) => {
  const pastOrders = props.pastOrders;

  console.log(pastOrders, "pastorders");

  return (
    <div>
      {pastOrders === null ? 
      <h1>LOAFING...</h1> : 
      pastOrders?.length ? 
      (
        pastOrders.map((order, idx) => {
          let total = 0;
          return (
            <Card key={idx}>
              <Card.Header>Cart {`${idx + 1}`}</Card.Header>
              <div>
                {order.products.map((product, idx) => {
                  total += product.price * product.quantity;
                  return (
                    <Card.Body key={idx}>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>Quantity:{product.quantity}</Card.Text>
                      <Card.Text>Price: ${product.price / 100}</Card.Text>
                    </Card.Body>
                  );
                })}
              </div>
              <Card.Footer>Total: ${total / 100}</Card.Footer>
            </Card>
          );
        })
      ) : <h1>you have not made any orders!</h1> }
    </div>
  );
};

export default PastOrders;

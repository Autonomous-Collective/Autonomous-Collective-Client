import React, { useEffect, useState } from "react";
import { checkoutCartCall, editCartProductCall } from "../API-Adapter";
import { MessageAlert } from "./";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FormControl, Form, ListGroupItem, ListGroup } from "react-bootstrap";

const UserCart = ({ cart, user, token }) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  console.log(cart, "cart from userCart page");
  let subTotal = 0;

  let totalPrice = 0;

  const editCartProduct = async (productId, quantity) => {
    const response = await editCartProductCall(
      token,
      user.id,
      productId,
      quantity
    );

    if (response.success && quantity === 0) {
      setMessage("Successfully Removed product from cart");
      setIsError(false);
    }
  };

  const checkOutCart = async () => {
    const response = await checkoutCartCall(token);
    if (response.success) {
      setMessage("You have succesfully checked out ");
      setIsError(false);
    } else {
      setMessage("Something went wrong");
      setIsError(true);
    }
  };

  return (
    <div id="userCartPageContainer">
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      <div id="userCartOrderContainer">
        <h1>Your Order:</h1>
        {cart?.products?.length ? (
          cart.products.map((product, idx) => {
            subTotal = product.price * product.quantity;
            totalPrice += subTotal;

            return (
              <div
                key={`${idx} of cart products map`}
                id="userCartOrderContainer"
              >
                <Card>
                  <Card.Header as="h5">{product.title}</Card.Header>
                  <Card.Img
                    src={product.img}
                    style={{ height: "300px", width: "200px", padding: "20px" }}
                  />
                  <Card.Body>
                    <Card.Title>by {product.author}</Card.Title>
                    <Card.Subtitle>${product.price / 100}</Card.Subtitle>
                    <Form.Label>Quantity:</Form.Label>
                    <FormControl
                      type="number"
                      min={1}
                      defaultValue={product.quantity}
                      onClick={(e) => {
                        editCartProduct(product.id, e.target.value);
                        subTotal = product.price * product.quantity;
                        product.quantity = e.target.value;
                        totalPrice -= subTotal;
                        subTotal = product.price * e.target.value;
                        document.getElementById(
                          `sub-total${idx}`
                        ).innerText = `Sub-total: ${subTotal / 100}`;
                        totalPrice += subTotal;
                        document.getElementById(
                          "total"
                        ).innerText = `Total Price: ${totalPrice / 100}`;

                        console.log("####", subTotal);
                      }}
                    ></FormControl>
                    <Form.Label>
                      <span id={`sub-total${idx}`}>
                        Sub-total: ${subTotal / 100}{" "}
                      </span>
                    </Form.Label>
                    <ListGroupItem></ListGroupItem>
                    <Button
                      variant="danger"
                      onClick={() => {
                        editCartProduct(product.id, 0);
                        setTimeout(() => {
                          window.location.reload();
                        }, 1500);
                      }}
                    >
                      Remove From Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : (
          <h1>Your cart is empty!</h1>
        )}
      </div>
      <div id="userCartCheckoutContainer">
        <Card style={{ width: "18rem" }}>
          <Card.Header>
            <span id="total">Total Price: ${totalPrice / 100}</span>
          </Card.Header>

          <Button
            style={{ margin: "15px" }}
            variant="success"
            onClick={() => {
              checkOutCart();

              setTimeout(() => {
                window.location.reload();
              }, 3500);
            }}
          >
            Checkout Cart
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default UserCart;

{
  /* <div>
  <div className="flex-column">
    <h2>Title: {product.title}</h2>
    <img
      src={product.img}
      alt={`cover image of ${product.title}`}
    />
    <h2> author: {product.author}</h2>
  </div>
  <div className="flex-column">
    {/* <h2>qty:{product.quantity}</h2> */
}
{
  /* <label>quantity</label>
    <input
      type="number"
      min={1}
      defaultValue={product.quantity}
      onChange={(e) => {
        editCartProduct(product.id, e.target.value);
      }}
    />
    <h2>Price: ${(product.price * product.quantity) / 100}</h2>
  </div>
  <button
    onClick={() => {
      editCartProduct(product.id, 0);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }}
  >
    delete product from cart
  </button>
</div> */
}
//     );
//   })
// ) : (
//   <h1>Your cart is empty!</h1>
// )}
//   <h3>Total Price: ${totalPrice / 100}</h3>
//   <button
//     onClick={() => {
//       checkOutCart();

//       setTimeout(() => {
//         window.location.reload();
//       }, 3500);
//     }}
//   >
//     Check Out!
//   </button>
// </div>

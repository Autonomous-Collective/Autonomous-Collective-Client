import React, { useState } from "react";
import { checkoutCartCall, editCartProductCall } from "../API-Adapter";
import { MessageAlert } from "./";

const UserCart = ({ cart, user, token }) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  console.log(cart, "cart from userCart page");
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
    <div>
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      <h1>Your Order:</h1>
      {cart?.products?.length ? (
        cart.products.map((product, idx) => {
          totalPrice += product.price * product.quantity;
          return (
            <div key={`${idx} of cart products map`} className="flex-row">
              <div>
                <div className="flex-column">
                  <h2>Title: {product.title}</h2>
                  <img
                    src={product.img}
                    alt={`cover image of ${product.title}`}
                  />
                  <h2> author: {product.author}</h2>
                </div>
                <div className="flex-column">
                  {/* <h2>qty:{product.quantity}</h2> */}
                  <label>quantity</label>
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
              </div>
            </div>
          );
        })
      ) : (
        <h1>Your cart is empty!</h1>
      )}
      <h3>Total Price: ${totalPrice / 100}</h3>
      <button
        onClick={() => {
          checkOutCart();

          setTimeout(() => {
            window.location.reload();
          }, 3500);
        }}
      >
        Check Out!
      </button>
    </div>
  );
};

export default UserCart;

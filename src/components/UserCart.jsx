import React, { useState } from "react";
import { checkoutCartCall, editCartProductCall } from "../API-Adapter";

const UserCart = ({ cart, user, token }) => {
  console.log(cart, "cart from userCart page");
  let totalPrice = 0;

  const editCartProduct = async (productId, quantity) => {
    const response = await editCartProductCall(
      token,
      user.id,
      productId,
      quantity
    );
    if (response.success) {
      console.log("changed in the backend!");
    }
  };

  const checkOutCart = async () => {
    const response = await checkoutCartCall(token);
    if (response.success) {
      document.getElementById(`success-message`).style.display = "inline";
    }
  };

  return (
    <div>
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
      <h3>Total Price: {totalPrice / 100}</h3>
      <button
        onClick={() => {
          checkOutCart();
        }}
      >
        Check Out!
      </button>
      <div id="success-message" display="none">
        <h1>You have successfully check out</h1>
        <button
          onClick={() => {
            document.getElementById(`success-message`).style.display = "none";
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserCart;

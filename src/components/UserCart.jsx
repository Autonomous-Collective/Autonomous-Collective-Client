import React, {useState} from "react";

const UserCart = ({ cart }) => {
    console.log(cart, "cart from userCart page")
    let totalPrice = 0;
    return(
        <div>
            <h1>Your Order:</h1>
            { cart?.products?.length ? 
            cart.products.map((product, idx) => {
                totalPrice += (product.price * product.quantity)
                return(
                    <div key={`${idx} of cart products map`} className="flex-row">
                        <div>
                        <div className="flex-column">
                        <h2>Title: {product.title}</h2>
                        <img src={product.img} alt={`cover image of ${product.title}`} />
                        <h2> author: {product.author}</h2>
                        </div>
                        <div className="flex-column">
                            <h2>qty:{product.quantity}</h2>
                            <h2>Price: ${(product.price * product.quantity) / 100}</h2>
                        </div>
                        </div>
                    </div>
                )
            })
            :
    
            <h1>Your cart is empty!</h1>
        }
        <h3>Total Price: {totalPrice / 100}</h3> 
        <button>Check Out!</button>
        </div>
    )
}

export default UserCart;
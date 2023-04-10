import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getProductByIdCall,
  addProductToCartCall,
  editCartProductCall,
} from "../API-Adapter";
import "./componentStyles/SingleProduct.css";
import { ReviewList, CreateReview, MessageAlert } from "./";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ListGroupItem } from "react-bootstrap";

const SingleProduct = ({ token, user, cart }) => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  console.log(productId, "product id ???????");

  const getProductById = async () => {
    const response = await getProductByIdCall(productId);
    if (response.success) {
      setProduct(response.product);
    }
  };

  const toggle = () => {
    const createRev = document.getElementById("create-review").style;
    if (createRev.display === "flex") {
      createRev.display = "none";
    } else {
      createRev.display = "flex";
    }
  };

  useEffect(() => {
    getProductById();
    console.log(product, "product is set! -----");
  }, []);

  const addProductToCart = async () => {
    console.log(
      token,
      user.id,
      productId,
      quantity,
      "add product to cart in single product"
    );

    for (let i = 0; i < cart.products?.length; i++) {
      console.log(cart.products[i]);
      if (cart.products[i].productId == productId) {
        await editCartProduct(cart.products[i].quantity);
        return null;
      }
    }

    const response = await addProductToCartCall(
      token,
      user.id,
      productId,
      quantity
    );
    if (response.success) {
      setMessage("Product was added to cart");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
      console.log("added to cart");
    } else {
      // setMessage("Please login");
      // setIsError(true);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
      if(!token){
        setMessage("Please login");
        setIsError(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }else{
        setMessage("Something went wrong");
        setIsError(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }
  };

  const editCartProduct = async (initQuant) => {
    let finalQuant = Number(initQuant) + Number(quantity);
    const response = await editCartProductCall(
      token,
      user.id,
      productId,
      finalQuant
    );

    if (response.success) {
      console.log("product was edited in cart");
      setMessage("Product was added to cart");
      setIsError(false);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      setMessage("Something went wrong");
      setIsError(true);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  return (
    //   <div className="flex-column">
    //     {message ? <MessageAlert message={message} isError={isError} /> : null}
    //     {product?.title ? (
    //       <>
    //         <div className="flex-row">
    //           <div id="single-prod-picture">
    //             <img
    //               src={product.img}
    //               alt="placeholder"
    //               height="500"
    //               width="450"
    //             ></img>
    //           </div>
    //           <div id="title-details">
    //             <h1>{product.title}</h1>
    //             <h3>By: {product.author}</h3>
    //             <p>{product.isbn}</p>
    //             <h4>${product.price / 100}</h4>
    //             <form
    //               onSubmit={(e) => {
    //                 e.preventDefault();
    //                 addProductToCart();
    //               }}
    //             >
    //               <label>choose the quantity</label>
    //               <input
    //                 type="number"
    //                 defaultValue={1}
    //                 min={1}
    //                 onChange={(e) => {
    //                   setQuantity(e.target.value);
    //                 }}
    //               />
    //               <button type="submit">add to cart</button>
    //             </form>
    //           </div>
    //         </div>
    //         <div className="flex-row">
    //           <div id="description">
    //             <p>{product.description}</p>
    //             <div id="product-tags-div">
    //               {product.tags?.length
    //                 ? product.tags.map((tag, idx) => {
    //                     return <p key={`${idx} tag list map`}>{tag}</p>;
    //                   })
    //                 : null}
    //             </div>
    //           </div>
    //           <div id="reviews">
    //             <button
    //               onClick={() => {
    //                 toggle();
    //               }}
    //             >
    //               Add a Reveiw
    //             </button>
    //             <div id="create-review">
    //               <CreateReview token={token} productId={product.id} />
    //             </div>
    //             <ReviewList productId={product.id} />
    //           </div>
    //         </div>
    //       </>
    //     ) : (
    //       <h1>LOAFING</h1>
    //     )}
    //   </div>
    // );

    <div id="singleProductPage">
      {message ? <MessageAlert message={message} isError={isError} /> : null}
      {product?.title ? (
        <div id="singleProductContainer">
          <Card>
            <Card.Header as="h2">{product.title}</Card.Header>
            <Card.Body>
              <Card.Img
                variant="top"
                src={product.img}
                style={{ height: "300px", width: "200px", padding: "20px" }}
              />
              <Card.Title>by {product.author}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <div id="product-tags-div" className="flex-row">
               {product.tags?.length
                    ?
                    
                    product.tags.map((tag, idx) => {
                        return <p key={`${idx} tag list map`} className="single-product-tags">{tag}</p>;
                      })
                    : null}
                </div>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>ISBN :{product.isbn}</ListGroup.Item>
                <ListGroup.Item>Price: ${product.price / 100}</ListGroup.Item>
                <ListGroupItem></ListGroupItem>
              </ListGroup>
              <Form className="">
                <Form.Label>Quantity:</Form.Label>
                <Form.Control
                  placeholder="Choose Quantity"
                  className="me-2"
                  aria-label="Choose Quantity"
                  type="number"
                  defaultValue={1}
                  min={1}
                  onChange={(event) => {
                    event.preventDefault();
                    setQuantity(event.target.value);
                  }}
                />
                <Button style={{marginTop: "15px"}}
                  variant="success"
                  onClick={(e) => {
                    e.preventDefault();
                    addProductToCart();
                  }}
                >
                  Add To Cart
                </Button>
              </Form>
              <Card.Body></Card.Body>
              {token ?    <Button
                variant="primary"
                onClick={() => {
                  toggle();
                }}
              >
                Create Review
              </Button> : null}
              <Card.Body></Card.Body>
              <div id="create-review">
                <CreateReview token={token} productId={product.id} />
              </div>
            </Card.Body>
              <div id="reviewContainer">
          <ReviewList productId={product.id} />
          </div>
          </Card>
        </div>
      ) : (
        <h1>Loafing</h1>
      )}
    </div>
  );
};

export default SingleProduct;

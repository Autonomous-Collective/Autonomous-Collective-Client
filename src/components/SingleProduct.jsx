import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdCall } from "../API-Adapter";
import "./componentStyles/SingleProduct.css";
import { ReviewList, CreateReview } from "./";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  console.log(productId, "product id ???????");

  const getProductById = async () => {
    const response = await getProductByIdCall(productId);
    if (response.success) {
      setProduct(response.product);
    }
  };

  const toggle = () => {
    const createRev = document.getElementById("create-review").style;
    if(createRev.display === "flex"){
      createRev.display = "none";
    }else{
      createRev.display = "flex";
    }
  }

  useEffect(() => {
    getProductById();
    console.log(product, "product is set! -----");
  }, []);

  return (
    <div className="flex-column">
      {product?.title ? (
        <>
          <div className="flex-row">
            <div id="single-prod-picture">
              <img
                src={product.img}
                alt="placeholder"
                height="500"
                width="450"
              ></img>
            </div>
            <div id="title-details">
              <h1>{product.title}</h1>
              <h3>By: {product.author}</h3>
              <p>{product.isbn}</p>
              <h4>${product.price / 100}</h4>
              <button onClick={() => {}}>add to cart</button>
            </div>
          </div>
          <div className="flex-row">
            <div id="description">
              <p>{product.description}</p>
              <div id="product-tags-div">
                {product.tags?.length
                  ? product.tags.map((tag, idx) => {
                      return <p key={`${idx} tag list map`}>{tag}</p>;
                    })
                  : null}
              </div>
            </div>
            <div id="reviews">
              <button onClick={() => {
                toggle();
              }}>Add a Reveiw</button>
              <div id="create-review" >
                <CreateReview productId={product.id}/>
              </div>
              <ReviewList productId={product.id} />
            </div>
          </div>
        </>
      ) : (
        <h1>LOAFING</h1>
      )}
    </div>
  );
};

export default SingleProduct;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductByIdCall } from "../API-Adapter";

const SingleProduct = () => {
    const [product, setProduct] = useState({});
    const { productId } = useParams();
    console.log(productId, "product id ???????");

    const getProductById = async() => {
        const response = await getProductByIdCall(productId);
        if(response.success){
            setProduct(response.product);
        }
    }

    useEffect(() => {
        getProductById();
        console.log(product, "product is set! -----");
    }, []);

    return (
        <div>
            { 
            product?.title ? 
            <>
            <div>
            <div id="single-prod-picture">
                <img src={product.img} alt="placeholder" height="500" width="450"></img>
            </div>
            <div id="title-details">
                <h1>{product.title}</h1>
                <h3>By: {product.author}</h3>
                <p>{product.isbn}</p>
                <h4>${product.price / 100}</h4>
                <button onClick={() => {

                }}>add to cart</button>
            </div>
            </div>
            <div>
            <div id="description">
                <p>{product.description}</p>
                {product.tags?.length ? 
                product.tags.map((tag, idx) =>  {return <p key={`${idx} tag list map`}>{tag}</p>})
                :null    
            }
            </div>
            <div id="reviews">

            </div>
            </div>
            </>
            : <h1>LOAFING</h1>
            }
        </div>
    )
}

export default SingleProduct;
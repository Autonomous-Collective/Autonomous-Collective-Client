import React, { useState, useEffect } from "react";
import { ProductCard } from "./";

const ProductsList = ({ allProducts, searchString }) => {
  console.log(allProducts, "all products from Products List *******");
console.log ("@@@@", searchString)

  return (
    <div id="productsContainer">
     {!searchString ?
    <div id="productsContainer">
      {allProducts.length ? (
        allProducts.map((product, idx) => {
          return product.isActive ? (
            <ProductCard product={product} key={`${idx} - product list map`} />
          ) : null;
        })
      ) : (
        <h1>LOAFING</h1>
      )}
      </div>
    : allProducts.map((product, idx)=> {
      let titleLowerCase = product.title.toLowerCase ();
      let authorLowerCase = product.author.toLowerCase()
      // let searchStringLowerCase = searchString.toLowerCase()
      if (
        titleLowerCase.includes(searchString) || authorLowerCase.includes(searchString) 
        ) {
          return (
            <ProductCard product={product} key={`${idx} - product list map`} />)
          }
        }) } 
    </div>
  );
};

export default ProductsList;

import React, { useState, useEffect } from "react";
import { ProductCard } from "./";

const ProductsList = ({ allProducts }) => {
  console.log(allProducts, "all products from Products List *******");
  return (
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
  );
};

export default ProductsList;

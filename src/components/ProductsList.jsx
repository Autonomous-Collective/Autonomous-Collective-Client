import React, { useState, useEffect } from "react";
import { ProductCard } from "./";

const ProductsList = (props) => {
  const allProducts = props.allProducts;
  const searchString = props.searchString;

  return (
    <div style={{display: "flex"}}>
      {!searchString.length ? (
        <div id="productsContainer">
          {allProducts.length ? (
            allProducts.map((product, idx) => {
              return product.isActive ? (
                <ProductCard
                  product={product}
                  key={`${idx} - product list map`}
                />
              ) : null;
            })
          ) : (
            <div className="loader"></div>
          )}
        </div>
      ) : (
        <div id="productsContainer">
        {allProducts.map((product, idx) => {
          let titleLowerCase = product.title.toLowerCase();
          let authorLowerCase = product.author.toLowerCase();
          let searchStringLowerCase = searchString.toLowerCase();

          if (
            titleLowerCase.includes(searchStringLowerCase) ||
            authorLowerCase.includes(searchStringLowerCase)
          ) {
            return (
              <ProductCard 
                product={product}
                key={`${idx} - product list map`}
              />
            );
          }
        })}
        </div>
      )}
    </div>
  );
};

export default ProductsList;

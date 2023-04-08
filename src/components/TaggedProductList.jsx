import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsByTagCall } from "../API-Adapter";
import { SideNav, ProductCard } from "./";

const TaggedProductList = (props) => {
  const allTags = props.allTags;
  const { name, tagId } = useParams();

  const [products, setProducts] = useState([]);

  const getProductsByTag = async () => {
    const result = await getProductsByTagCall(tagId);
    if (result.success) {
      setProducts(result.products);
    }
  };

  useEffect(() => {
    getProductsByTag();
  }, []);

  return (
    <div id="productByTagContainer">
      <h1 id="productByTagTitle">All {name} Books:</h1>
      {products.length ? (
        <div id="home-content-container">
          <SideNav allTags={allTags} />
          {products.length ? (
            products.map((product, idx) => {
              return product.isActive ? (
                <ProductCard
                  product={product}
                  key={`${idx} - product list map`}
                />
              ) : null;
            })
          ) : (
            <h1>LOAFING</h1>
          )}
        </div>
      ) : (
        <h1> no products found with this tag! </h1>
      )}
    </div>
  );
};

export default TaggedProductList;

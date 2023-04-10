import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductsByTagCall } from "../API-Adapter";
import { SideNav, ProductCard } from "./";

const TaggedProductList = (props) => {
  const allTags = props.allTags;
  const { name, tagId } = useParams();

  const [products, setProducts] = useState(null);

  const getProductsByTag = async () => {
    const result = await getProductsByTagCall(tagId);
    console.log(result, "result from tagged products");
    if (result.success) {
      setProducts(result.products);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    getProductsByTag();
  }, []);

  console.log(products, "products in tagged product list");

  return (
    <div>
      <h1 id="productByTagTitle">All {name} Books:</h1>
      <div id="home-content-container">
        <SideNav allTags={allTags} />
        {products === null ? (
          <h1>LOAFING</h1>
        ) : products?.length ? (
          <div id="productsContainer">
            {products.map((product, idx) => {
              return product.isActive ? (
                <ProductCard
                  product={product}
                  key={`${idx} - product list map`}
                />
              ) : null;
            })}
          </div>
        ) : (
          <h1>no products were found with this tag!</h1>
        )}
      </div>
    </div>
  );
};

export default TaggedProductList;

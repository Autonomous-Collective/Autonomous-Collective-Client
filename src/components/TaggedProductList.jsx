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

    if (result.success) {
      setProducts(result.products);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    getProductsByTag();
  }, [name]);

  return (
    <div>
      <h1 id="productByTagTitle">All {name} Books:</h1>
      <div id="home-content-container">
        <SideNav allTags={allTags} />
        {products === null ? (
          <div className="loader"></div>
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
          <h1>No products were found with this tag!</h1>
        )}
      </div>
    </div>
  );
};

export default TaggedProductList;

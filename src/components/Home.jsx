import React from "react";
import { ProductsList } from "./";

const Home = ({ allProducts }) => {
  return (
    <div id="main">
     <ProductsList allProducts={allProducts} />
    </div>
  );
};

export default Home;
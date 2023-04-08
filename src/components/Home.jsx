import React from "react";
import Nav from "react-bootstrap/Nav";
import { ProductsList, SideNav, MessageAlert } from "./";

const Home = ({ allProducts, allTags }) => {
  return (
    <div id="main">
      <div id="home-content-container">
        <SideNav allTags={allTags} />
        <ProductsList allProducts={allProducts} />
      </div>
    </div>
  );
};

export default Home;

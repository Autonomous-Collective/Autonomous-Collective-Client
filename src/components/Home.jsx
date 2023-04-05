import React from "react";
import Nav from 'react-bootstrap/Nav';
import { ProductsList, SideNav } from "./";

const Home = ({ allProducts }) => {
  return (
    <div id="main">
      <div id="home-content-container">
        <SideNav />
        <ProductsList allProducts={allProducts} />
     </div>
    </div>
  );
};

export default Home;
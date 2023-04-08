import React from "react";
import Nav from 'react-bootstrap/Nav';
import { ProductsList, SideNav } from "./";

const Home = ({ allProducts, allTags, setSearchString, searchString }) => {
  return (
    <div id="main">
      <div id="home-content-container">
        <SideNav allTags={allTags} setSearchString={setSearchString} />
        <ProductsList allProducts={allProducts} searchString={searchString} />
     </div>
    </div>
  );
};

export default Home;
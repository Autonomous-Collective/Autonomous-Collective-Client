import React, { useState, useEffect } from "react";
import {
  NavBar,
  Footer,
  Home,
  Login,
  Register,
  SingleProduct,
  AdminPage,
} from "./";
import { Routes, Route } from "react-router-dom";
import { getAllProductsCall, getAllUsersCall } from "../API-Adapter";

const Main = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJwYXJrZXIuam9zaWUuZWRlbkBnbWFpbC5jb20iLCJpYXQiOjE2ODA3OTE3MTd9.bAHfSU17t31taoFNk9nN5K-Hx1-D1a0-l2B6K2Iu8bw";
  const getAllProducts = async () => {
    const response = await getAllProductsCall();

    if (response.success) {
      setAllProducts(response.products);
      console.log(response, "response from main for all products!!!");
    }
  };
  const getAllUsers = async () => {
    const response = await getAllUsersCall(token);

    if (response.success) {
      setAllUsers(response.allUsers);
      console.log(response, "response from main for all users!!!");
    }
  };

  useEffect(() => {
    getAllProducts();
    console.log(allProducts, "all products from the main use effect");
    getAllUsers();
  }, []);

  //use effect
  //check for token in local storage,
  //grabs userdata and sets state
  //grabs token and sets state
  //grabs cart and sets state

  //if no token, then token is assignedo n login
  //user info asignedo n login
  //grab cart on login

  return (
    <div id="main">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home allProducts={allProducts} />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/products/:productId" element={<SingleProduct />} />
        <Route
          exact
          path="/admin"
          element={
            <AdminPage
              token={token}
              allProducts={allProducts}
              allUsers={allUsers}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default Main;

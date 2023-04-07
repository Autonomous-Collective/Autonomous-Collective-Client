import React, { useState, useEffect } from "react";
import {
  NavBar,
  Footer,
  Home,
  Login,
  Register,
  SingleProduct,
  AdminPage,
  UserProfilePage,
} from "./";
import { Routes, Route } from "react-router-dom";
import {
  getAllProductsCall,
  getAllUsersCall,
  getAllTagsCall,
  getPastOrdersCall,
} from "../API-Adapter";

const Main = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [allTags, setAllTags] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

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

  const getAllTags = async () => {
    const response = await getAllTagsCall();
    if (response.success) {
      setAllTags(response.tags);
    }
  };

  const getPastOrders = async () => {
    const response = await getPastOrdersCall(token, user.id);
    // console.log(response.userOrders, "$$$$$$$");
    if (response.success) {
      setPastOrders(response.userOrders);
    }
  };

  useEffect(() => {
    getAllProducts();
    console.log(allProducts, "all products from the main use effect");
    getAllTags();

    if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        setUser(JSON.parse(localStorage.getItem("user")));
        setIsLoggedIn(true);
    }
    
  }, []);

  useEffect(() => {
    getAllUsers();
    getPastOrders()
  }, [isLoggedIn]);

  return (
    <div id="main">
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        user={user}
        setUser={setUser}
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home allProducts={allProducts} allTags={allTags} />}
        />
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
        <Route
          exact
          path="/profile"
          element={<UserProfilePage user={user} token={token} pastOrders={pastOrders} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default Main;

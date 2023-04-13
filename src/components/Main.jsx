import React, { useState, useEffect } from "react";
import {
  NavBar,
  Footer,
  Home,
  Register,
  SingleProduct,
  AdminPage,
  UserProfilePage,
  UserCart,
  TaggedProductList,
} from "./";
import { Routes, Route } from "react-router-dom";
import {
  getAllProductsCall,
  getAllUsersCall,
  getAllTagsCall,
  getCartByUserIdCall,
  getPastOrdersCall,
} from "../API-Adapter";

const Main = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");

  const [cart, setCart] = useState("");

  const [allProducts, setAllProducts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const [allTags, setAllTags] = useState([]);
  const [pastOrders, setPastOrders] = useState(null);

  const [searchString, setSearchString] = useState([]);

  const getAllProducts = async () => {
    const response = await getAllProductsCall();

    if (response.success) {
      setAllProducts(response.products);
    }
  };
  const getAllUsers = async () => {
    const response = await getAllUsersCall(token);

    if (response.success) {
      setAllUsers(response.allUsers);
    }
  };

  const getAllTags = async () => {
    const response = await getAllTagsCall();

    if (response.success) {
      setAllTags(response.tags);
    }
  };

  const getCartByUserId = async () => {
    const response = await getCartByUserIdCall(token, user.id);

    if (response.success) {
      setCart(response.cart);
    }
  };

  const getPastOrders = async () => {
    const response = await getPastOrdersCall(token, user.id);

    if (response.success) {
      setPastOrders(response.userOrders);
    } else {
      setPastOrders([]);
    }
  };

  useEffect(() => {
    getAllProducts();

    getAllTags();

    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    getAllUsers();

    getCartByUserId();

    getPastOrders();
  }, [token]);

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
          element={
            <Home
              allProducts={allProducts}
              allTags={allTags}
              setSearchString={setSearchString}
              searchString={searchString}
            ></Home>
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route
          exact
          path="/products/:productId"
          element={<SingleProduct token={token} user={user} cart={cart} />}
        />
        <Route
          exact
          path="/products/:name/:tagId"
          element={
            <TaggedProductList
              user={user}
              cart={cart}
              allTags={allTags}
              setSearchString={setSearchString}
              searchString={searchString}
            />
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <AdminPage
              token={token}
              allProducts={allProducts}
              allUsers={allUsers}
              allTags={allTags}
            />
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <UserProfilePage
              user={user}
              token={token}
              pastOrders={pastOrders}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          exact
          path="/cart"
          element={<UserCart cart={cart} user={user} token={token} />}
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default Main;

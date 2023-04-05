import React, { useState, useEffect } from "react";
import { Navbar, Footer, Home,  Login, Register, SingleProduct } from "./";
import { Routes, Route } from "react-router-dom";
import { getAllProductsCall } from "../API-Adapter";

const Main = () => {
const [allProducts, setAllProducts] = useState([]);

const getAllProducts = async() => {
    const response = await getAllProductsCall();

    if(response.success){
        setAllProducts(response.products);
        console.log(response, "response from main for all products!!!");
    }
}

useEffect(() => {
    getAllProducts();
    console.log(allProducts, "all products from the main use effect");
}, [])
    
    return(
        <div id="main">
            <Navbar />
            <Routes>
                <Route exact path = "/" element ={ <Home allProducts={allProducts} />}/>
                <Route exact path = "/login" element ={ <Login/>}/>
                <Route exact path = "/register" element ={ <Register/>}/>
                <Route exact path = "/products/:productId" element={<SingleProduct/>} />
            </Routes>
            <Footer/>
        </div>
    )
}

export default Main
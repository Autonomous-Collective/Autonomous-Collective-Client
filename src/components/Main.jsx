import React from "react";
import { NavBar, Footer, Home,  Login, Register } from "./";
import { Routes, Route } from "react-router-dom";

const Main = () => {
    return(
        <div id="main">
            <NavBar />
            <Routes>
                <Route exact path = "/" element ={ <Home/>}/>
                <Route exact path = "/login" element ={ <Login/>}/>
                <Route exact path = "/register" element ={ <Register/>}/>

            </Routes>
            <Footer/>
        </div>
    )
}

export default Main
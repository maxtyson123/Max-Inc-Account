import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import AuthApp from "../Pages/AuthApp";
import "../App.css"
import { AnimatePresence } from "framer-motion";


const Main = () => {
    const location = useLocation();
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route index element={<Home/>} />
                <Route path="/auth" element={<Signup />} />
                <Route path="/authapp" element={<AuthApp />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Games" element={<Home />} />
                <Route path="/Launcher" element={<Home />} />
                <Route path="/Account" element={<Home />} />
            </Routes>
        </AnimatePresence>


    );
}

export default Main;
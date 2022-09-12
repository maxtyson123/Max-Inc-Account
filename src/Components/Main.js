import React from 'react';
import { Route, Routes} from 'react-router-dom';
import Home from "../Pages/Home";
import Signup from "../Pages/Signup";
import "../App.css"

const Main = () => {
    return (

            <Routes>
                    <Route index element={<Home/>} />
                    <Route path="/auth" element={<Signup />} />
            </Routes>

    );
}

export default Main;
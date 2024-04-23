import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateItem from "./pages/CreateItems";
import ShowItem from "./pages/ShowItem";
import EditItem from "./pages/EditItem";
import DeleteItem from "./pages/DeleteItem";
import Students from './pages/Students'
import Register from './pages/Register'
import Login from "./pages/Login";

const App = () => {

    
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items/create" element={<CreateItem />} />
            <Route path="/items/details/:id" element={<ShowItem />} />
            <Route path="/items/edit/:id" element={<EditItem />} />
            <Route path="/items/delete/:id" element={<DeleteItem />} />
            <Route path='/items/student/:id' element={<Students/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
};

export default App


                        // if(log.returnTime){
                        //     var hours = log.returnTime.getHours();
                        //     var minutes = log.returnTime.getMinutes();
                        //     var seconds = log.returnTime.getSeconds();

                        //     // Format the time to ensure leading zeros if needed
                        //     hours = (hours < 10 ? "0" : "") + hours;
                        //     minutes = (minutes < 10 ? "0" : "") + minutes;
                        //     seconds = (seconds < 10 ? "0" : "") + seconds;

                        //     // Create a string representing the current time
                        //     var currentTime = hours + ":" + minutes + ":" + seconds;
                        // }
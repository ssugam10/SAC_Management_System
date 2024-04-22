import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items/create" element={<CreateBook />} />
            <Route path="/items/details/:id" element={<ShowBook />} />
            <Route path="/items/edit/:id" element={<EditBook />} />
            <Route path="/items/delete/:id" element={<DeleteBook />} />
        </Routes>
    );
};

export default App;

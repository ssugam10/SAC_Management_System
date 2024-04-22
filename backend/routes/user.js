import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

const handleLogin = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) return res.redirect("/login");

    req.user = getUser(token);

    if (!req.user) return res.redirect("/login");

    if (req.user.role == "student") return res.redirect("/student"); //redirect to student home page

    if (req.user.role == "guard") return res.redirect("/guard"); //guard home page
};

export default router;

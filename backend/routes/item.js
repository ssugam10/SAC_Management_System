import express from "express";
import Item from "../models/Item.js";
import {
    createItem,
    deleteItem,
    getItem,
    getItems,
    updateItem,
    getQueue,
} from "../controllers/item.controllers.js";
import { guardAuth } from "../middlewares/auth.js";

const router = express.Router();

//Route for saving a new item
router.post("/", guardAuth, createItem);

//Route to get all items from the database
router.get("/", getItems);
router.get("/:id", getItem);
router.get("/:id/queue", getQueue);

router.delete("/:id", deleteItem);

router.put("/:id", updateItem);

export default router;

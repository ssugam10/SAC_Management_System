import express from "express";
import Item from "../models/Item.js";
import { createItem, getItems } from "../controllers/item.controllers.js";

const router = express.Router();

//Route for saving a new item
router.post("/", createItem);

//Route to get all books from the database
router.get("/", getItems);

// //route for displaying data related to only one item
// router.get('/:id', async(req,res) => {
//     try{
//         const {id} = req.params;

//         const item = await Item.findById(id);
//         return res.status(200).json(item);
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).send({message: err.message});
//     }
// });

// //Route to update a item
// router.put('/:id', async(req,res) => {
//     try{
//         if(!req.body.title || !req.body.author || !req.body.publishYear) {
//             return res.status(400).send({message: "Send all the required fields"});
//         }

//         const {id} = req.params;

//         const result = await Item.findByIdAndUpdate(id, req.body);
//         if(!result) return res.status(404).json({"message":"item not found!"});
//         return res.status(200).send({"message": "item updated successfully!"});
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).send({message: err.message});
//     }
// })

// router.delete('/:id', async(req,res) => {
//     try{
//         const {id} = req.params;

//         const result = await Item.findByIdAndDelete(id);
//         if(!result) return res.status(404).json({message:'Item Not found!'});
//         else return res.status(200).send({message: 'Item deleted successfully!'});
//     }
//     catch(error){
//         console.log(error.message);
//         res.status(500).send({message:error.message});
//     }
// });

export default router;

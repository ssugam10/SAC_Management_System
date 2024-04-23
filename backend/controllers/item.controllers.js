import Item from "../models/Item.js";
import Request from "../models/Request.js";

export const getItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        return res.status(200).send({ count: items.length, data: items });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
};

export const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findOne({
            where: { id },
        });
        if (!item) return res.status(404).send({ message: "Item not found!" });
        return res.status(200).send(item);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, quantity, needRepairs } = req.body;
        const item = await Item.findOne({
            where: { id },
        });
        if (!item) return res.status(404).send({ message: "Item not found!" });

        const updatedItem = {
            name: name ? name : item.name,
            quantity: quantity ? quantity : item.quantity,
            remaining: quantity ? quantity : item.quantity,
            needRepairs: needRepairs ? needRepairs : item.needRepairs,
        };

        const result = await Item.update(updatedItem, { where: { id } });
        if (!result)
            return res.status(404).send({ message: "Item not updated!" });
        return res.status(200).send({ message: "Item updated successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
};

export const createItem = async (req, res) => {
    const { name, quantity, repairs } = req.body;
    try {
        if (!name || !quantity) {
            return res
                .status(400)
                .send({ message: "Send all the required fields" });
        }

        const item = await Item.findOne({
            where: { name },
        });

        if (item) {
            return res.status(400).send({ message: "Item already exists" });
        }

        const newItem = {
            name: name,
            quantity: quantity,
            remaining: quantity,
            needRepairs: repairs ? repairs : false,
        };

        const createdItem = await Item.create(newItem);
        return res.status(201).send(createdItem);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID: ", id);
        const result = await Item.destroy({ where: { id } });
        if (!result)
            return res.status(404).json({ message: "Item not found!" });
        return res.status(200).send({ message: "Item deleted successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
};

export const getQueue = async (req, res) => {
    try {
        const itemId = req.params.id; // Get item ID from URL parameters

        const item = await Item.findByPk(itemId, {
            include: Request,
        });

        if (!item) {
            return res.status(404).send({ message: "Item not found" });
        }

        res.status(200).json(item); // Send back the requests related to the item
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).send({
            message: "Error retrieving requests for the item",
        });
    }
};

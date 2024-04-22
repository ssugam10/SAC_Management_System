import Item from "../models/Item.js";

export const getItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        return res.status(200).send({ count: items.length, data: items });
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

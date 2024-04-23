import User from "../models/User.js";
import Request from "../models/Request.js";
import Item from "../models/Item.js";

export const createRequest = async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
    console.log("ITEM: ", itemId);
    try {
        if (!itemId || !quantity) {
            return res
                .status(400)
                .send({ message: "Send all the required fields" });
        }

        const item = await Item.findOne({
            where: { id: itemId },
        });

        if (!item) {
            return res.status(404).send({ message: "Item not found" });
        }

        if (item.remaining < quantity) {
            return res.status(400).send({ message: "Not enough items" });
        }

        const request = {
            itemId,
            userId: req.user.id,
            quantity: quantity ? quantity : 1,
        };

        const createdRequest = await Request.create(request);
        return res.status(201).send(createdRequest);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
};

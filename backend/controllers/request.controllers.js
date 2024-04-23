import User from "../models/User.js";
import Request from "../models/Request.js";
import Item from "../models/Item.js";
import Student from "../models/Student.js";

export const createRequest = async (req, res) => {
    let { itemId, quantity } = req.body;
    itemId = Number(itemId);
    quantity = Number(quantity);
    const studentId = Number(req.user.studentId);
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

        const student = await Student.findOne({
            where: { id: studentId },
        });

        if (!student) {
            return res.status(404).send({ message: "Student not found" });
        }

        if (item.remaining < quantity) {
            return res.status(400).send({ message: "Not enough items" });
        }

        const request = {
            itemId,
            studentId,
            quantity: quantity ? quantity : 1,
        };

        const createdRequest = await Request.create(request);
        return res.status(201).send(createdRequest);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
};

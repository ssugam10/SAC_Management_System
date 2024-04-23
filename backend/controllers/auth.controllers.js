import Guard from "../models/Guard.js";
import Student from "../models/Student.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { setUser } from "../services/auth.js";

export const register = async (req, res) => {
    const { email, password, name } = req.body;
    console.log(email);
    console.log(password);
    console.log(name);
    try {
        if (!email || !password) {
            return res
                .status(400)
                .send({ message: "Send all the required fields" });
        }

        const user = await User.findOne({
            where: { email },
        });

        if (user) {
            return res.status(400).send({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            email: email,
            password: hashedPassword,
            role: "student",
            name,
        };

        const createdUser = await User.create(newUser);
        const createdStudent = await Student.create({ userId: createdUser.id });
        return res.status(201).send(createdUser);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res
                .status(400)
                .send({ message: "Send all the required fields" });
        }

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(400).send({ message: "User does not exist" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const token = setUser({ id: user.id, role: user.role });
        return res.status(200).send({
            id: user.id,
            role: user.role,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
};

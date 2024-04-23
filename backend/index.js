import express from "express";
import sequelize from "./config.js";

import itemsRoute from "./routes/item.js";
import morgan from "morgan";
import Item from "./models/Item.js";
import Student from "./models/Student.js";
import Request from "./models/Request.js";
import User from "./models/User.js";
import Guard from "./models/Guard.js";
import HistoryLog from "./models/HistoryLog.js";
import cors from "cors";
import router from "./routes/index.js";
import dotenv from "dotenv";

const PORT = 5555;

const app = express();
dotenv.config();

Item.hasMany(Request);
Request.belongsTo(Item);

Student.hasMany(Request);
Request.belongsTo(Student);

Student.hasOne(Item); //Item table will get StudentId column
Item.belongsTo(Student);

User.hasMany(Student);
Student.belongsTo(User);

User.hasMany(Guard);
Guard.belongsTo(User);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.get("/", (req, res) => {
    return res.status(234).send("Welcome home");
});
sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(PORT);
        app.use("/api", router);
        console.log(
            `Database connected and server running on port ${PORT}! 🚀`
        );
    })
    .catch((err) => console.log(err));

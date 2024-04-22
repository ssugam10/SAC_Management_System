import express from "express";
import sequelize from "./config.js";

import booksRoute from "./routes/book.js";

import Item from "./models/item.js";
import Student from "./models/student.js";
import Request from "./models/request.js";
import User from "./models/user.js";
import Guard from "./models/guard.js";
import cors from "cors";

const PORT = 5555;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(234).send("Welcome home");
});

app.use("/books", booksRoute);

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

sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(PORT);
    console.log("Database connected and server running!");
  })
  .catch((err) => console.log(err));

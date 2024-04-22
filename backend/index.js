import express from "express";
import sequelize from "./config.js";

import booksRoute from "./routes/book.js";

import Item from "./models/Item.js";
import Student from "./models/Student.js";
import Request from './models/Request.js';
import User from './models/User.js';
import Guard from './models/Guard.js';
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

Student.hasOne(Item);   //Item table will get StudentId column
Item.belongsTo(Student);

User.hasMany(Student);
Student.belongsTo(User);

User.hasMany(Guard);
Guard.belongsTo(User);

sequelize
  .sync({force: true})
  .then(() => {
    app.listen(PORT);
    console.log("Database connected and server running!");
  })
  .catch((err) => console.log(err));

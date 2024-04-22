import Sequelize from "sequelize";
import sequelize from "../config.js";

const Item = sequelize.define("item", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    timeOfIssue: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    needRepairs: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    quantity: { type: Sequelize.INTEGER, default: 1 },
    remaining: { type: Sequelize.INTEGER, default: 1 },
});

export default Item;

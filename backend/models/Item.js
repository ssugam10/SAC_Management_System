import Sequelize from 'sequelize';
import sequelize from '../config.js';

const Item = sequelize.define('item',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    timeOfIssue: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    needRepairs: Sequelize.BOOLEAN,
    quantity: Sequelize.INTEGER,
    remaining: Sequelize.INTEGER
});

export default Item;
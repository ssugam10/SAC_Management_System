import Sequelize from 'sequelize';
import sequelize from '../config.js';

const Book = sequelize.define('book',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type:  Sequelize.STRING,
        allowNull: false
    },
    publishYear: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Book;
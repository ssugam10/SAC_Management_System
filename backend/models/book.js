import Sequelize from 'sequelize';
import { sequelize } from '../config';

const Book = sequelize.define('book',{
        title: {
            type: Sequelize.STRING,
            required: true
        },
        author: {
            type:  Sequelize.STRING,
            required: true
        },
        publishYear: {
            type: Sequelize.INTEGER,
            required: true
        }
    }
);

module.exports = Book;
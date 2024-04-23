import Sequelize from 'sequelize';
import sequelize from '../config.js';

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: { //student or guard
        type: Sequelize.STRING,
        default: "student",
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default User;
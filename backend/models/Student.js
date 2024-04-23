import Sequelize from 'sequelize';
import sequelize from '../config.js';

const Student = sequelize.define('student', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

export default Student;
import Sequelize from 'sequelize';
import sequelize from '../config.js';

const Guard = sequelize.define('guard', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dutyStart: {
        type: Sequelize.DATE
    },
    dutyEnd: {
        type: Sequelize.DATE
    },
});

export default Guard;
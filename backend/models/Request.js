import Sequelize from 'sequelize';
import sequelize from '../config.js';

const Request = sequelize.define('request', {
    time: {
        type: Sequelize.DATE
    }
});
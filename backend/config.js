const PORT = 5555;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('sac_management_system', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});     

module.exports = {
    PORT,
    sequelize
};


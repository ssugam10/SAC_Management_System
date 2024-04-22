
import Sequelize from 'sequelize';

const sequelize = new Sequelize('sac_management_system', 'root', 'sugam112', {
    dialect: 'mysql',
    host: 'localhost'
});     

export default sequelize;

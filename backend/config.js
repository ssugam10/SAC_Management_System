import Sequelize from "sequelize";

const sequelize = new Sequelize("sac_mgmt", "root", "root", {
    dialect: "mysql",
    host: "localhost",
});

export default sequelize;

import Sequelize from "sequelize";

const sequelize = new Sequelize("sac_mgmt", "root", "root", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
});

export default sequelize;

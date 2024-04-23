import Sequelize from "sequelize";

const sequelize = new Sequelize("sac_management_system", "root", "user123", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
});

export default sequelize;

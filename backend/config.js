import Sequelize from "sequelize";

const sequelize = new Sequelize("sac_management_system", "root", "root", {
    dialect: "mysql",
    host: "localhost",
    port: 8889,
});

export default sequelize;

module.exports = {
  development: {
    username: "root",
    password: "abacaxi",
    database: "crud_sequelize",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: 3306,
    dialect: "mysql",
  },
};

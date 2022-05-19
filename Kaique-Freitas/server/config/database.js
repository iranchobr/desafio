require("dotenv/config")

const config = {
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_NAME),
  host: String(process.env.DB_HOST),
  options: { dialect: process.env.DB_DIALECT, port: Number(process.env.DB_PORT) },
  dialect: String(process.env.DB_DIALECT),
};

module.exports = config;

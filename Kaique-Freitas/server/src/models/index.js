const { Sequelize } = require('sequelize');

const config = require('../../config/database');
const { database, username, password, host, options } = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  port: options.port,
  dialect: options.dialect,
});

module.exports = sequelize;

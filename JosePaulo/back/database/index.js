const databaseConfig = require('../config/database');
const Sequelize = require('sequelize'); 
const connection = new Sequelize(databaseConfig); 
module.exports = connection; 
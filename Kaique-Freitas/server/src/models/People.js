const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const People = sequelize.define('people', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
  gender: DataTypes.STRING,
  ic_active: DataTypes.BOOLEAN
}, {
  timestamps: false,
});

module.exports = People;

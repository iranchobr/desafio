const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Lot = sequelize.define('lot', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: DataTypes.STRING,
  description: DataTypes.STRING,
}, {
  timestamps: false,
});

module.exports = Lot;
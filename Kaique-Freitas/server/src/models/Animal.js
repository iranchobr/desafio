const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Animal = sequelize.define(
  'animals',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    people_id: { type: DataTypes.INTEGER, allowNull: false },
    name: DataTypes.STRING,
    breed: DataTypes.STRING,
    gender: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    birth_date: DataTypes.DATE,
  },
  {
    timestamps: false,
  }
);

module.exports = Animal;

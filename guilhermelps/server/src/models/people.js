'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class people extends Model {
    static associate(models) {
    }
  };
  people.init({
    no_pessoa: DataTypes.STRING,
    no_email: DataTypes.STRING,
    endereco: DataTypes.STRING,
    sexo: DataTypes.CHAR,
    ic_ativo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'people',
  });
  return people;
};
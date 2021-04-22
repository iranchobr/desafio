'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pessoa extends Model {
    static associate(models) {
      
    }
  };
  pessoa.init({
    no_pessoa: DataTypes.STRING,
    no_email: DataTypes.STRING,
    endereco: DataTypes.STRING,
    sexo: DataTypes.CHAR,
    ic_ativo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'pessoa',
    tableName: 'pessoas'
  });
  return pessoa;
};
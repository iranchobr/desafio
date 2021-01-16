'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  });
  return pessoa;
};
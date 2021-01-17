'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class animal_x_lote extends Model {
    static associate(models) {
      
    }
  };
  animal_x_lote.init({
    dt_entrada: DataTypes.DATEONLY,
    dt_saida: DataTypes.DATEONLY,
    dt_ultima_movimentacao: DataTypes.DATEONLY,
    ic_bezerro: DataTypes.BOOLEAN,
    fk_id_animal: DataTypes.INTEGER,
    fk_id_lote: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'animal_x_lote',
  });
  return animal_x_lote;
};
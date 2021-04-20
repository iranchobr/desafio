'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class animal_batch extends Model {
    static associate(models) {
      this.belongsTo(models.animal, { foreignKey: 'fk_id_animal', as: 'animal'})
      this.belongsTo(models.batch, { foreignKey: 'fk_id_batch', as: 'batch'})
    }
  };
  animal_batch.init({
    fk_id_animal: DataTypes.INTEGER,
    fk_id_batch: DataTypes.INTEGER,
    dt_entrada: DataTypes.DATEONLY,
    dt_saida: DataTypes.DATEONLY,
    dt_ultima_movimentacao: DataTypes.DATEONLY,
    ic_bezerro: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'animal_batch',
  });
  return animal_batch;
};
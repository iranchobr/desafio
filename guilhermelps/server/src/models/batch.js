'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class batch extends Model {
    static associate(models) {
      this.belongsToMany(models.animal, { foreignKey: 'fk_id_batch', through: 'animal_batches', as: 'animal' })
    }
  };
  batch.init({
    no_lote: DataTypes.STRING,
    ds_lote: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'batch',
  });
  return batch;
};
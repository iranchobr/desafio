'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lote extends Model {
    static associate(models) {
      lote.belongsToMany(models.animal, {
        through: 'animal_x_lotes',
        foreignKey: 'fk_id_lote',
      });
    }
  };
  lote.init({
    no_lote: DataTypes.STRING,
    ds_lote: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'lote',
  });
  return lote;
};
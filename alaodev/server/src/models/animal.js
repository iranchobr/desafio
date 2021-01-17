'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class animal extends Model {
    static associate(models) {
      animal.belongsTo(models.pessoa, {
        foreignKey: 'fk_id_pessoa',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
      animal.belongsToMany(models.lote, {
        through: 'animal_x_lotes',
        foreignKey: 'fk_id_animal',
      });
    }
  };
  animal.init({
    id_fazenda: DataTypes.INTEGER,
    no_animal: DataTypes.STRING,
    no_raca: DataTypes.STRING,
    sexo: DataTypes.CHAR,
    vr_peso: DataTypes.FLOAT,
    dt_nascimento: DataTypes.DATEONLY,
    fk_id_pessoa: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'animal',
  });
  return animal;
};
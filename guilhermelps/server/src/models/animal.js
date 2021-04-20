'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class animal extends Model {
    static associate(models) {
      this.belongsTo(models.people, { foreignKey: 'fk_id_people', as: 'people'})
      this.belongsToMany(models.batch, { foreignKey: 'fk_id_animal', through: 'animal_batches', as: 'batch'})
    }
  };
  animal.init({
    fk_id_people: DataTypes.INTEGER,
    id_fazenda: DataTypes.STRING,
    no_animal: DataTypes.STRING,
    no_raca: DataTypes.STRING,
    sexo: DataTypes.CHAR,
    vr_peso: DataTypes.FLOAT,
    dt_nascimento: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'animal',
  });
  return animal;
};
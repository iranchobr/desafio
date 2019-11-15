'use strict';
const Joi = require('joi')

module.exports = (sequelize, DataTypes) => {
  const Lote = sequelize.define('Lote', {
    no_lote: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ds_lote: DataTypes.STRING
  }, {
    timestamps: false,
    tableName: 'lotes'
  });
  Lote.associate = function(models) {
    Lote.belongsToMany(models.Animal, {
      through: 'AnimalLote',
      as: 'animais',
      foreignKey: 'fk_id_lote',
      otherKey: 'fk_id_animal',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  };

  Lote.joiSchema = Joi.object({
    no_lote: Joi.string().min(3).required(),
    ds_lote: Joi.string().min(5)
  })
  return Lote;
};
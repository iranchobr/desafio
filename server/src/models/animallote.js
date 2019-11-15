'use strict';
const Joi = require('joi')

module.exports = (sequelize, DataTypes) => {
  const AnimalLote = sequelize.define('AnimalLote', {
    fk_id_animal: DataTypes.INTEGER,
    fk_id_lote: DataTypes.INTEGER,
    dt_entrada: DataTypes.DATEONLY,
    dt_saida: DataTypes.DATEONLY,
    dt_ultima_movimentacao: DataTypes.DATE,
    ic_bezerro: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    tableName: 'animal_lote'
  });
  AnimalLote.associate = function(models) {
    
  };

  AnimalLote.joiSchema = (putting = false) => {
    return Joi.object({
      fk_id_animal: putting ? Joi.any().forbidden() : Joi.number().positive().integer(),
      fk_id_lote: putting ? Joi.any().forbidden() : Joi.number().positive().integer().required(),
      dt_entrada: Joi.date(),
      dt_saida: Joi.date(),
      dt_ultima_movimentacao: Joi.date(),
      ic_bezerro: Joi.boolean()
    })
  }

  return AnimalLote;
};
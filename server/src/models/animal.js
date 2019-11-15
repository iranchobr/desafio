'use strict';
const Joi = require('joi')

module.exports = (sequelize, DataTypes) => {
  const Animal = sequelize.define('Animal', {
    fk_id_pessoa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_fazenda: DataTypes.INTEGER,
    no_animal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    no_raca: DataTypes.STRING,
    sexo: DataTypes.CHAR,
    vr_peso: DataTypes.FLOAT,
    dt_nascimento: Joi.date()
  }, {
    timestamps: false,
    tableName: 'animais'
  });
  Animal.associate = function(models) {
    Animal.belongsTo(models.Pessoa, {
      as: 'dono',
      foreignKey: 'fk_id_pessoa',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

    Animal.belongsToMany(models.Lote, {
      through: 'AnimalLote',
      as: 'lotes',
      foreignKey: 'fk_id_animal',
      otherKey: 'fk_id_lote',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  };

  Animal.joiSchema = (putting = false) => {
    return Joi.object({
      no_animal: Joi.string().required(),
      id_fazenda: Joi.number().integer().positive(),
      no_raca: Joi.string().min(2),
      sexo: Joi.string().regex(/^(m|M|f|F)$/),
      vr_peso: Joi.number(),
      dt_nascimento: Joi.date(),
  
      // fk_id_pessoa accepts id or email, makes value forbidden for PUTing
      fk_id_pessoa: putting ? Joi.any().forbidden() : Joi.alternatives(
        Joi.string().email(),
        Joi.number().integer().positive()
      ).required()
    })
  }
  return Animal;
};
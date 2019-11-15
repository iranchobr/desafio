'use strict';
const Joi = require('joi')

module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    no_pessoa: DataTypes.STRING,
    no_email: {
      type: DataTypes.STRING,
      unique: true
    },
    endereco: DataTypes.STRING,
    sexo: DataTypes.CHAR,
    ic_ativo: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    tableName: 'pessoas'
  });
  Pessoa.associate = function(models) {
    Pessoa.hasMany(models.Animal, {
      as: 'animais',
      foreignKey: 'fk_id_pessoa',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
  };

  Pessoa.joiSchema = Joi.object({
    no_pessoa: Joi.string().required(),
    no_email: Joi.string().email().required(),
    endereco: Joi.string().min(3),
    sexo: Joi.string().regex(/^(m|M|f|F)$/),
    ic_ativo: Joi.boolean().required()
  })
  return Pessoa;
};
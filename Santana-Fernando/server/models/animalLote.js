const Sequelize = require("sequelize");
const sequelize = require("../config/conection");
const Joi = require("joi");

const animalLote = sequelize.define(
  "animalLote",
  {
    fk_id_animal: Sequelize.INTEGER,
    fk_id_lote: Sequelize.INTEGER,
    dt_entrada: Sequelize.DATEONLY,
    dt_saida: Sequelize.DATEONLY,
    dt_ultima_movimentacao: Sequelize.DATE,
    ic_bezerro: Sequelize.BOOLEAN,
  },
  {
    timestamps: false,
    tableName: "animal_lote",
  }
);

animalLote.associate = function (models) {};

animalLote.joiSchema = (putting = false) => {
  return Joi.object({
    fk_id_animal: putting
      ? Joi.any().forbidden()
      : Joi.number().positive().integer(),
    fk_id_lote: putting
      ? Joi.any().forbidden()
      : Joi.number().positive().integer().required(),
    dt_entrada: Joi.date(),
    dt_saida: Joi.date(),
    dt_ultima_movimentacao: Joi.date(),
    ic_bezerro: Joi.boolean(),
  });
};

//animalLote.sync({ force: true });

module.exports = animalLote;

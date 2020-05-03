const Sequelize = require("sequelize");
const sequelize = require("../config/conection");
const Joi = require("joi");

const Animal = sequelize.define(
  "animal",
  {
    fk_id_pessoa: {
      type: Sequelize.INTEGER,
    },
    id_fazenda: {
      type: Sequelize.STRING,
    },
    no_animal: {
      type: Sequelize.STRING,
    },
    no_raca: {
      type: Sequelize.STRING,
    },
    sexo: {
      type: Sequelize.CHAR,
    },
    vr_peso: {
      type: Sequelize.FLOAT,
    },
    dt_nascimento: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Animais",
  }
);

Animal.associate = function (models) {
  Animal.belongsTo(models.Pessoa, {
    as: "dono",
    foreignKey: "fk_id_pessoa",
  });

  Animal.belongsToMany(models.Lote, {
    through: "AnimalLote",
    as: "lotes",
    foreignKey: "fk_id_animal",
    otherKey: "fk_id_lote",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
};

Animal.joiSchema = (putting = false) => {
  return Joi.object({
    no_animal: Joi.string().required(),
    id_fazenda: Joi.string().required(),
    no_raca: Joi.string().min(2),
    sexo: Joi.string(),
    vr_peso: Joi.number(),
    dt_nascimento: Joi.date(),

    fk_id_pessoa: putting
      ? Joi.any().forbidden()
      : Joi.alternatives(
          Joi.string().email(),
          Joi.number().integer().positive()
        ).required(),
  });
};
//Animal.sync({ force: true });

module.exports = Animal;

const Sequelize = require("sequelize");
const sequelize = require("../config/conection");
const Joi = require("joi");

const Lote = sequelize.define(
  "lote",
  {
    no_lote: {
      type: Sequelize.STRING,
    },
    ds_lote: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    tableName: "lote",
  }
);

Lote.associate = function (models) {
  Lote.belongsToMany(models.Animal, {
    through: "AnimalLote",
    as: "animais",
    foreignKey: "fk_id_lote",
    otherKey: "fk_id_animal",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
};

Lote.joiSchema = Joi.object({
  no_lote: Joi.string().min(3).required(),
  ds_lote: Joi.string().min(5),
});

//Lote.sync({ force: true });

module.exports = Lote;

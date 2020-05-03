const Sequelize = require("sequelize");
const sequelize = require("../config/conection");
const Joi = require("joi");

const Pessoa = sequelize.define(
  "pessoas",
  {
    nome_pessoa: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    endereco: {
      type: Sequelize.STRING,
    },
    sexo: {
      type: Sequelize.CHAR,
    },
    ic_ativo: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
    tableName: "pessoas",
  }
);

Pessoa.associate = function (models) {
  Pessoa.hasMany(models.Animal, {
    as: "animais",
    foreignKey: "fk_id_pessoa",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

Pessoa.joiSchema = Joi.object({
  nome_pessoa: Joi.string().required(),
  email: Joi.string().email().required(),
  endereco: Joi.string().min(3),
  sexo: Joi.string(),
  ic_ativo: Joi.boolean().required(),
});

//Pessoa.sync({ force: true });

module.exports = Pessoa;

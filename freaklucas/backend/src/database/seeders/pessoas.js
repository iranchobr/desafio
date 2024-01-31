"use strict";

const Pessoa = require("../../models/Pessoa");

module.exports = {
  async up(queryInterface, Sequelize) {
    const pessoas = [];
    pessoas.push({
      nome: "João",
      cpf: "111.111.111-11",
      email: "joao@email.com",
      data_nascimento: "2000-01-01",
    });
    pessoas.push({
      nome: "Maria",
      cpf: "222.222.222-22",
      email: "maria@email.com",
      data_nascimento: "1999-01-01",
    });

    await Pessoa.bulkCreate(pessoas);
  },

  async down(queryInterface, Sequelize) {
    await Pessoa.destroy({
      where: {},
      truncate: true,
    });
  },
};

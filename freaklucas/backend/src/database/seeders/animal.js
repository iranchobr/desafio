'use strict';
const { Pessoa, Animal } = require('../../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    const pessoa = await Pessoa.findOne({ where: { nome: 'João' } });
    const animais = [];
    animais.push({
      fk_id_pessoa: pessoa.id,
      id_fazenda: 1,
      no_animal: 'Bobby',
      no_raca: 'Labrador',
      sexo: 'M',
      vr_peso: 30,
      dt_nascimento: '2021-01-01'
    });
    animais.push({
      fk_id_pessoa: pessoa.id,
      id_fazenda: 1,
      no_animal: 'Max',
      no_raca: 'Poodle',
      sexo: 'M',
      vr_peso: 20,
      dt_nascimento: '2021-02-01'
    });

    await Animal.bulkCreate(animais);
  },

  async down (queryInterface, Sequelize) {
    await Animal.destroy({
      where: {},
      truncate: true
    });
  }
};
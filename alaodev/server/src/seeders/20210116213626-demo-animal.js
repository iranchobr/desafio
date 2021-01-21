'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('animals', [
      {
        id_fazenda: 1,
        no_animal: 'Jack',
        no_raca: 'Boi',
        sexo: 'M',
        vr_peso: 250.5,
        dt_nascimento: '2020-02-01',
        fk_id_pessoa: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_fazenda: 2,
        no_animal: 'Muu',
        no_raca: 'Vaca',
        sexo: 'F',
        vr_peso: 200,
        dt_nascimento: '2019-05-02',
        fk_id_pessoa: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_fazenda: 3,
        no_animal: 'Black',
        no_raca: 'Boi',
        sexo: 'M',
        vr_peso: 359.8,
        dt_nascimento: '2010-02-20',
        fk_id_pessoa: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id_fazenda: 3,
        no_animal: 'Ferdinando',
        no_raca: 'Touro',
        sexo: 'M',
        vr_peso: 400.8,
        dt_nascimento: '2015-09-17',
        fk_id_pessoa: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {});
  }
};

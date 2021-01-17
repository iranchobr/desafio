'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('animal_x_lotes', [
      {
        dt_entrada: '2020-05-10',
        dt_saida: null,
        dt_ultima_movimentacao: '2020-05-10',
        ic_bezerro: true,
        fk_id_animal: 1,
        fk_id_lote: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dt_entrada: '2019-12-30',
        dt_saida: '2020-05-10',
        dt_ultima_movimentacao: '2020-05-10',
        ic_bezerro: false,
        fk_id_animal: 2,
        fk_id_lote: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        dt_entrada: '2020-06-19',
        dt_saida: null,
        dt_ultima_movimentacao: '2020-06-19',
        ic_bezerro: true,
        fk_id_animal: 3,
        fk_id_lote: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('People', null, {});
  }
};

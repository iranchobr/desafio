'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('animal_batch', [
      {
        fk_id_animal: 9,
        fk_id_batch: 4,
        dt_entrada: "2020-09-08",
        dt_saida: "2020-09-08",
        dt_ultima_movimentacao: "2020-09-08",
        ic_bezerro: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fk_id_animal: 11,
        fk_id_batch: 6,
        dt_entrada: "2019-03-14",
        dt_saida: "2019-03-16",
        dt_ultima_movimentacao: "2019-03-18",
        ic_bezerro: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fk_id_animal: 7,
        fk_id_batch: 5,
        dt_entrada: "2021-01-20",
        dt_saida: "2021-02-03",
        dt_ultima_movimentacao: "2021-02-10",
        ic_bezerro: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fk_id_animal: 8,
        fk_id_batch: 7,
        dt_entrada: "2020-05-21",
        dt_saida: "2020-05-29",
        dt_ultima_movimentacao: "2020-06-03",
        ic_bezerro: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fk_id_animal: 10,
        fk_id_batch: 8,
        dt_entrada: "2020-12-08",
        dt_saida: "2020-12-17",
        dt_ultima_movimentacao: "2020-12-22",
        ic_bezerro: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('animal_batch', null, {});
  }
};

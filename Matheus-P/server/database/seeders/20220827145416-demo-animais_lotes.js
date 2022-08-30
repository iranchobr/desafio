'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('animal_x_lote', [
      {
        fk_id_animal: 1,
        fk_id_lote: 1,
        dt_entrada: new Date(2015, 4, 5),
        dt_saida: new Date(2017, 4, 5),
        dt_ultima_movimentacao: new Date(2017, 4, 5),
        ic_bezerro: true,
      },
      {
        fk_id_animal: 2,
        fk_id_lote: 1,
        dt_entrada: new Date(2015, 4, 5),
        dt_saida: new Date(2017, 4, 5),
        dt_ultima_movimentacao: new Date(2017, 4, 5),
        ic_bezerro: false,
      },
      {
        fk_id_animal: 3,
        fk_id_lote: 2,
        dt_entrada: new Date(2015, 4, 5),
        dt_saida: new Date(2017, 4, 5),
        dt_ultima_movimentacao: new Date(2017, 4, 5),
        ic_bezerro: true,
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('animal_x_lote', null, {});
  }
};
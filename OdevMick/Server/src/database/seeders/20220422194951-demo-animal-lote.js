'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('animais_lotes', [{
      fk_id_animal:1,
      fk_id_lote:1,
      dt_entrada:'2020/01/10',
      dt_saida:'2020/02/10',
      dt_ultima_movimentacao:'2020/01/20',
      ic_bezerro:true,
    }]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('animais_lotes"', null, {});
  }
};

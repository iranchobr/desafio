'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('lotes', [
     {
       no_lote:'Teste lote',
       ds_lote:'Teste descrição',
       
     }
   ]);
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lotes', null, {});
  }
};

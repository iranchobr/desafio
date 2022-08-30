'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('animal_lote', [
      {
        no_lote: '#4276',
        ds_lote: 'Lote 4276'
      },
      {
        no_lote: '#4213',
        ds_lote: 'Lote 4213'
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('animal_lote', null, {});
  }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('lotes', [
      {
        no_lote: 'Fazenda da Irmandade',
        ds_lote: 'Fazenda localizada no sul de Minas Gerais',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_lote: 'Fazenda Felicidade',
        ds_lote: 'Fazenda localizada no sul de Goiás',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_lote: 'Fazenda Água Viva',
        ds_lote: 'Fazenda localizada no sul de São Paulo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_lote: 'Fazenda dos Sonhos',
        ds_lote: 'Fazenda localizada no norte do Acre',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_lote: 'Fazenda Primitiva',
        ds_lote: 'Fazenda localizada no norte da Amazônia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_lote: 'Fazenda Nobreza',
        ds_lote: 'Fazenda localizada no sul do Rio de Janeiro',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lote', null, {});
  }
};

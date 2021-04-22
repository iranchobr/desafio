'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('batch', [
      {
        no_lote: "Área de Alimentação",
        ds_lote: "Área destinada a alimentação dos animais.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        no_lote: "Área Médica",
        ds_lote: "Área destinada a realização de procedimentos médicos nos animais.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        no_lote: "Área de Pesagem",
        ds_lote: "Área destinada a pesagem dos animais.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        no_lote: "Área de Coleta",
        ds_lote: "Área destinada a ordenha das vacas.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        no_lote: "Área de Repouso",
        ds_lote: "Área destinada para o descanso dos animais.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('batch', null, {});
  }
};

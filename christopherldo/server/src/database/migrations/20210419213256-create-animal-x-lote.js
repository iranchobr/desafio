'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('animal_x_lote', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_id_animal: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fk_id_lote: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dt_entrada: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      dt_saida: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      dt_ultima_movimentacao: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      ic_bezerro: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('animal_x_lote');
  }
};
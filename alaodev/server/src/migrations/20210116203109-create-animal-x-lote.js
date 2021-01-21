'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('animal_x_lotes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dt_entrada: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      dt_saida: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      dt_ultima_movimentacao: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      ic_bezerro: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      fk_id_animal: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'animals', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      fk_id_lote: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'lotes', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('animal_x_lotes');
  }
};
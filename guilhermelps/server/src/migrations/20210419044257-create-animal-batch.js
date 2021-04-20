'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('animal_batches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_id_animal: {
        type: Sequelize.INTEGER,
        references: { model: 'animals', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fk_id_batch: {
        type: Sequelize.INTEGER,
        references: { model: 'batches', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      dt_entrada: {
        type: Sequelize.DATEONLY
      },
      dt_saida: {
        type: Sequelize.DATEONLY
      },
      dt_ultima_movimentacao: {
        type: Sequelize.DATEONLY
      },
      ic_bezerro: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('animal_batches');
  }
};
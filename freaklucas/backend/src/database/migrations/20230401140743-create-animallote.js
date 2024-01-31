'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('animal_lote', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      fk_id_animal: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'animal',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fk_id_lote: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'lote',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      dt_entrada: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      dt_saida: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      dt_ultima_movimentacao: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      ic_bezerro: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('animal_lote');
  }
};

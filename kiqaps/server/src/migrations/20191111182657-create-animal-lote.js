'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('animal_lote', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_id_animal: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'animais'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fk_id_lote: {
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          model: 'lotes'
        },
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
        type: Sequelize.DATE
      },
      ic_bezerro: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('animal_lote');
  }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

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
        references : {
          key: 'id' ,
          model: 'animais'
        }
      },
      fk_id_lote: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          key: 'id' ,
          model: 'lotes'
        }
      },
      dt_entrada: {
        type: Sequelize.DATEONLY,
      },
      dt_saida: {
        type: Sequelize.DATEONLY,
      },
      dt_ultima_mov: {
        type: Sequelize.DATEONLY,
      },
      ic_bezerro: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('animal_lote');
  }
};

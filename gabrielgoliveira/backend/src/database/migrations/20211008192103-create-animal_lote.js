'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('lotes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      no_lote: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ds_lote: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_At: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_At: {
        allowNull: false,
        type: Sequelize.DATE
      }
     });
 
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('lotes');
  }
};

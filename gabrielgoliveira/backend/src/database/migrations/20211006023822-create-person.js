'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {  
    await queryInterface.createTable('pessoas', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      no_pessoa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no_email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sexo: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      ic_ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('pessoas');
  }
};

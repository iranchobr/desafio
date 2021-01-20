'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pessoas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_pessoa: {
        allowNull: false,
        type: Sequelize.STRING
      },
      no_email: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.CHAR
      },
      ic_ativo: {
        allowNull: false,
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
    await queryInterface.dropTable('pessoas');
  }
};
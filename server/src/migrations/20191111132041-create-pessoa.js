'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoas', {
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
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pessoas');
  }
};
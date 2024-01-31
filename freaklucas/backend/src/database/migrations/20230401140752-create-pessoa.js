'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pessoa', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        validate: {
          isIn: [['M', 'F']]
        }
      },
      ic_ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pessoa');
  }
};

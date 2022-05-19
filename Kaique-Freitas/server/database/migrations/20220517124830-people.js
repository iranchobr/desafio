'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('people', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('M', 'F'),
        allowNull: false,
      },
      ic_active: {
        type: Sequelize.BOOLEAN,
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('people');
  },
};


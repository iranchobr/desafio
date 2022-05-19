'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('animals', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      people_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'people',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      breed: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('M', 'F'),
        allowNull: false,
      },
      weight: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('animals');
  },
};

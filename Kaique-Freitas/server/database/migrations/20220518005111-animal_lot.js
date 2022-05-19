'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('animal_lot', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      animal_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'animals',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      lot_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'lot',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      entry_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      departure_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_move_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ic_calf: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('animal_lot');
  },
};

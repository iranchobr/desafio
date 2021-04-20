'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_id_people: {
        type: Sequelize.INTEGER,
        references: { model: 'people', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_fazenda: {
        type: Sequelize.INTEGER
      },
      no_animal: {
        type: Sequelize.STRING
      },
      no_raca: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.CHAR
      },
      vr_peso: {
        type: Sequelize.FLOAT
      },
      dt_nascimento: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('animals');
  }
};
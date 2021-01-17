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
      fk_id_pessoa: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'pessoas', key: 'id'}
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
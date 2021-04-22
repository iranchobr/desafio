'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('animal', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_id_pessoa: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_fazenda: {
        type: Sequelize.INTEGER
      },
      no_animal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      no_raca: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sexo: {
        allowNull: false,
        type: Sequelize.STRING(1)
      },
      vr_peso: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dt_nascimento: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('animal');
  }
};
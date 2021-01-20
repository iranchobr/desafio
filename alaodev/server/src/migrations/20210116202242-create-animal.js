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
        allowNull: false,
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
        type: Sequelize.CHAR
      },
      vr_peso: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      dt_nascimento: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      fk_id_pessoa: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'pessoas', key: 'id'},
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('animais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fk_id_pessoa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          key: 'id',
          model: 'pessoas'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_fazenda: {
        type: Sequelize.INTEGER
      },
      no_animal: {
        type: Sequelize.STRING,
        allowNull: false
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
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('animais');
  }
};
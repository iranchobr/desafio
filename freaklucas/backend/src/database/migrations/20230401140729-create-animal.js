"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("animal", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fk_id_pessoa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pessoa",
          key: "id",
        },
      },
      id_fazenda: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      no_animal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_raca: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sexo: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      vr_peso: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      dt_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("animal");
  },
};
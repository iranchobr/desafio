"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("animal_lote", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      id_fk_animal: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "animais",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      id_fk_lote: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "lotes",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      dt_entrada: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      dt_saida: {
        allowNull: true,
        type: Sequelize.DATE,
      },

      /*       dt_mov: {
        allowNull: false,
        type: Sequelize.DATE,
      }, */

      ativo_bez: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    Example: return queryInterface.dropTable("animal_lote");
  },
};

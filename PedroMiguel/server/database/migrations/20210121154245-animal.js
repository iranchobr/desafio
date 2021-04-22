"use strict";
//id - fk id pessoa - id fazenda - nome - nome raça -
//sexo - vr peso - dt nascimento

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("animais", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      fk_id_pessoas: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          key: "id",
          model: "pessoas",
        },
        onUpdate: "CASCADE", //atualizar o campo ao qual a chave estrangeira se refere
        onDelete: "CASCADE", //dados filho são excluídos quando os dados pai são excluídos.
      },

      id_fazenda: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      raca: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      sexo: {
        allowNull: false,
        type: Sequelize.CHAR,
      },

      peso: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },

      nascimento: {
        allowNull: false,
        type: Sequelize.DATEONLY,
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
    return queryInterface.dropTable("animais");
  },
};

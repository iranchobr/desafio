'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('pessoa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      no_pessoa: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      no_email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      endereco: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sexo: {
        allowNull: false,
        type: DataTypes.CHAR(1),
      },
      ic_ativo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP()'),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('pessoa');
  }
};
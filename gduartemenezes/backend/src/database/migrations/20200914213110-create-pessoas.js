module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoas', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      no_pessoa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      no_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sexo: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('pessoas');
  },
};

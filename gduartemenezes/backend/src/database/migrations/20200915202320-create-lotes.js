module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lotes', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      no_lote: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ds_lote: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('lotes');
  },
};

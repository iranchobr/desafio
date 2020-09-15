module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('animais', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
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
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      dt_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fk_id_pessoa: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          key: 'id',
          model: 'pessoas',
        },
      },
      id_fazenda: {
        type: Sequelize.UUID,
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
    return queryInterface.dropTable('animais');
  },
};

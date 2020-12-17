module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('animal_lotes', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      dt_entrada: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dt_saida: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dt_ultima_movimentacao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      ic_bezerro: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      fk_id_lote: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          key: 'id',
          model: 'lotes',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      fk_id_animal: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          key: 'id',
          model: 'animals',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
    return queryInterface.dropTable('animal_lotes');
  },
};

'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('animal_x_lote', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fk_id_animal: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      fk_id_lote: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      dt_entrada: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      dt_saida: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      dt_ultima_movimentacao: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      ic_bezerro: {
        allowNull: false,
        type: DataTypes.STRING,
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
    })
    .then(() => queryInterface.addConstraint('animal_x_lote', {
      fields: ['fk_id_animal'],
      type: 'foreign key',
      name: 'fk_animal',
      references: { //Required field
        table: 'animal',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }))
    .then(() => queryInterface.addConstraint('animal_x_lote', {
      fields: ['fk_id_lote'],
      type: 'foreign key',
      name: 'fk_lote',
      references: { //Required field
        table: 'animal_lote',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('animal_x_lote');
  }
};
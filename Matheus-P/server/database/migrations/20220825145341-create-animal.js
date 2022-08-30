'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('animal', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fk_id_pessoa: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      id_fazenda: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      no_animal: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      no_raca: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sexo: {
        allowNull: false,
        type: DataTypes.CHAR(1),
      },
      vr_peso: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      dt_nascimento: {
        allowNull: false,
        type: DataTypes.DATE,
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
    .then(() => queryInterface.addConstraint('animal', {
      fields: ['fk_id_pessoa'],
      type: 'foreign key',
      name: 'fk_animal_x_pessoa',
      references: { //Required field
        table: 'pessoa',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('animal');
  }
};
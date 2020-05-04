'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    return queryInterface.createTable('Animals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      }, 
      people_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      farm_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
      },
      species: {
        type: DataTypes.STRING
      },
      sex: {
        type: DataTypes.STRING(1)
      },
      weight: {
        type: DataTypes.DECIMAL(7,2)
      },
      date_birth: {
        type: DataTypes.DATE
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Animals');
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    return queryInterface.createTable('BatchsAnimals', {
      batch_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      }, 
      animal_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      }, 
      date_output: {
        type: DataTypes.DATE,
        allowNull: false
      },
      date_input: {
        type: DataTypes.DATE,
        allowNull: false
      },
      date_last_movimentation: {
        type: DataTypes.DATE,
        allowNull: false
      },
      ic_animal: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('BatchsAnimals');
  }
};


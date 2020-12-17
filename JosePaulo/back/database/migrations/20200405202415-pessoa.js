'use strict'; 
// migrations criam as tabelas no bd
// pessoa - id - nome - email - enderec - sex - ic ativo

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pessoas',
     {
        id:{
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        nome:{
          allowNull: false,
          type: Sequelize.STRING,
        },
        email:{
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
        },
        endereco:{
          allowNull: false,
          type: Sequelize.STRING,
        },
        sexo:{
          allowNull: false,
          type: Sequelize.CHAR, 
        },
        ativo:{
          
          allowNull: false, 
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        }
      }    
    );
  },
    
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pessoas');
  }
};

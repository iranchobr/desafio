'use strict';

module.exports = {
    up: async (queryInterface, Sequelize)=> {
        await queryInterface.createTable('pessoas',{
            id:{
                type:Sequelize.BIGINT,
                autoIncrement:true,
                primaryKey:true
              },
              no_pessoa:{
                type:Sequelize.STRING,
                allowNull: false,
                unique: true
              },
              no_email:{
                type:Sequelize.STRING,
                allowNull:false,
                unique:true,
              },
              endereco:{
                type:Sequelize.STRING
              },
              sexo:{
                allowNull:false,
                type:Sequelize.ENUM('M','F')
              },
              ic_ativo:{
                allowNull:false,
                type:Sequelize.BOOLEAN
              }
        }) 
    },

    down: async (queryInterface, Sequelize)=> {
        await queryInterface.dropTable('pessoas');
    }
};

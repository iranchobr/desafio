'use strict';

module.exports = {
   up: async (queryInterface, Sequelize)=> {
      await queryInterface.createTable('lotes', 
        { 
          id:{
            type: Sequelize.BIGINT,
            autoIncrement:true,
            primaryKey:true,
          },
          no_lote:{
            type:Sequelize.STRING,
            allowNull:false,
            unique: true
          },
          ds_lote:{
            type:Sequelize.STRING
          }
        });
  },

 down: async (queryInterface, Sequelize)=> {
    await queryInterface.dropTable('lotes');
     
  }
};

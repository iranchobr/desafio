'use strict';

module.exports = {
  up: async(queryInterface, Sequelize)=> {
    await queryInterface.createTable('animais_lotes', 
      {
    id:{
      type: Sequelize.BIGINT,
      autoIncrement:true,
      primaryKey:true,
    },
    
    fk_id_animal:{
      type: Sequelize.BIGINT,
      references:{
        model:{
          tableName:'animais',
        },
        key:'id',
      },
      allowNull:false,
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },

    fk_id_lote:{
      type: Sequelize.BIGINT,
      references:{
        model:{
          tableName:'lotes'
        },
        key:'id'
      },
      allowNull:false,
      onDelete:'CASCADE',
      onUpdate:'CASCADE'
    },
   
    dt_entrada: {
      type: Sequelize.DATEONLY,
      allowNull:false,
    },

    dt_saida: {
      type: Sequelize.DATEONLY,
      allowNull:false,
    },
    
    dt_ultima_movimentacao: {
      type: Sequelize.DATEONLY,
      allowNull:false,
    },
    ic_bezerro:{
      type: Sequelize.BOOLEAN,
      allowNull:false
    }
      });
  },

  down: async(queryInterface, Sequelize)=> {
    await queryInterface.dropTable('animais_lotes');
 }
};

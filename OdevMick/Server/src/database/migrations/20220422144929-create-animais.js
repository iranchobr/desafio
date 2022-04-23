'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('animais', { 
      id:{
        type: Sequelize.BIGINT,
        autoIncrement:true,
        primaryKey:true,
      },
      fk_id_pessoa:{
        type:Sequelize.BIGINT,
        references:{
          model:'pessoas',
          key:'id',
                  },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull:false,
      },
      id_fazenda:{
        type: Sequelize.BIGINT,
        allowNull:false,
      },
      no_animal:{
        type: Sequelize.STRING,
        allowNull:false,
        unique: true
      },
      no_raca:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      sexo:{
        type: Sequelize.ENUM('M','F'),
        allowNull:false,
      },
      vr_peso:{
        type: Sequelize.FLOAT,
        allowNull:false,
      },
      dt_nascimento:{
        type: Sequelize.DATEONLY
      },
      });
  },

  down:  async (queryInterface, Sequelize)=> {
       await queryInterface.dropTable('animais');
     
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('animais', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      fk_id_pessoa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          key: 'id' , /* Primary Key da Tabela de Referencia */
          model: 'pessoas' /* Nome da tabela de referencia */
        },
        onUpdate: 'CASCADE', /* Se a Primary Key da tabela de referencia mudar,
        essa mudança deve ser refletida aqui */
        onDelete: 'CASCADE' /* Se o usuário dono da primary key for deletado, deletar
        tambem os animais que fazem relacionamento com esse usuário */
      },
      id_fazenda: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      no_animal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      no_raca: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sexo: {
        type: Sequelize.CHAR,
        allowNull: false
      },
      vr_peso : {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      dt_nascimento : {
        /*Receber apenas data. 
        atributo não obrigatorio pois pode haver alguns 
        animais cujo a data de nascimento é desconhecida */
        type: Sequelize.DATEONLY 
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
 
    });
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('animais');
  }
};

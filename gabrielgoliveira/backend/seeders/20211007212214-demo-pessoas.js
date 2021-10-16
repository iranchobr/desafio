'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('pessoas', [   
      {
        no_pessoa: 'Gabriel Oliveira',
        no_email: 'gabriel@teste.com',
        endereco: 'Rua 1, Goiania - GO',
        sexo: 'M',
        ic_ativo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        no_pessoa: 'João Silveira',
        no_email: 'joao@teste.com',
        endereco: 'Rua 2, Goiania - GO',
        sexo: 'M',
        ic_ativo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        no_pessoa: 'Daniel da Costa',
        no_email: 'daniel@teste.com',
        endereco: 'Rua 3, Goiania - GO',
        sexo: 'M',
        ic_ativo: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        no_pessoa: 'Pedro Paulo',
        no_email: 'pedro@teste.com',
        endereco: 'Rua 4, Goiania - GO',
        sexo: 'M',
        ic_ativo: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('pessoas', null, {});
     
  }
};

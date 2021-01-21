'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pessoas', [
      {
        no_pessoa: 'André Luiz',
        no_email: 'andre@andre.com',
        endereco: 'Vila Maria',
        sexo: 'M',
        ic_ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_pessoa: 'Pedro Henrique',
        no_email: 'pedro@pedro.com',
        endereco: 'Vila Brasília',
        sexo: 'M',
        ic_ativo: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_pessoa: 'Ana Maria',
        no_email: 'ana@ana.com',
        endereco: 'Jardim Belo',
        sexo: 'F',
        ic_ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_pessoa: 'Felipe dos Santos',
        no_email: 'felipe@felipe.com',
        endereco: 'Setor Bueno',
        sexo: 'M',
        ic_ativo: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_pessoa: 'Maria Regina',
        no_email: 'maria@maria.com',
        endereco: 'Setor Sul',
        sexo: 'F',
        ic_ativo: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        no_pessoa: 'Carla Almeida',
        no_email: 'carla@carla.com',
        endereco: 'Residencial Bonança',
        sexo: 'F',
        ic_ativo: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pessoas', null, {});
  }
};

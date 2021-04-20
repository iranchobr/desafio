'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('people', [
      {
        no_pessoa: "Pedro",
        no_email: "pedro@gmail.com",
        endereco: "Avenida Leste, Goiânia",
        sexo: "M",
        ic_ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        no_pessoa: "João",
        no_email: "joao@hotmail.com",
        endereco: "Rua 10, Aparecida de Goiânia",
        sexo: "M",
        ic_ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        no_pessoa: "Flavia",
        no_email: "flavia@gmail.com",
        endereco: "Avenina Alegre, Porto Alegre",
        sexo: "F",
        ic_ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        no_pessoa: "Marcos",
        no_email: "marcos@fazenda.com",
        endereco: "Rua 73, Trindade",
        sexo: "M",
        ic_ativo: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        no_pessoa: "Julia",
        no_email: "julia@email.com",
        endereco: "Avenida Boa Vista, Belo Horizonte",
        sexo: "F",
        ic_ativo: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('people', null, {});
  }
};

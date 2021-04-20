'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('persons', [
      {
        no_pessoa: 'Thiago',
        no_email: 'thiago@hotmail.com',
        endereco: 'Avenida Rio Verde, Aparecida de Goiânia',
        sexo: 'M',
        ic_ativo: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        no_pessoa: 'Fernanda',
        no_email: 'fernanda@hotmail.com',
        endereco: 'Avenida Leste, Aparecida de Goiânia',
        sexo: 'F',
        ic_ativo: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

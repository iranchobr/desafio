'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('pessoas', [{
      no_pessoa:"Teste",
      no_email:"email@teste.com",
      sexo:"M",
      ic_ativo:true
    }]);
  },

  down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('pessoas', null, {});
  }
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('animais', [{
      fk_id_pessoa:1,
      id_fazenda:1,
      no_animal:'Teste',
      no_raca:'Teste',
      sexo:'F',
      vr_peso:210.5,
      dt_nascimento:'2020/01/10'
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('animais', null, {});
    
  }
};

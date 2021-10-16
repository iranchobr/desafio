'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('animais', [   
      {
        fk_id_pessoa:  21,
        id_fazenda : 1,
        no_animal: 'Boi',
        no_raca: 'nelore',
        sexo: 'M',
        vr_peso: true,
        dt_nascimento: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        fk_id_pessoa:  21,
        id_fazenda : 1,
        no_animal: 'Vaca',
        no_raca: 'Galloway',
        sexo: 'M',
        vr_peso: true,
        dt_nascimento: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        fk_id_pessoa:  22,
        id_fazenda : 2,
        no_animal: 'Boi',
        no_raca: 'nelore',
        sexo: 'M',
        vr_peso: true,
        dt_nascimento: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('animais', null, {});
     
  }
};

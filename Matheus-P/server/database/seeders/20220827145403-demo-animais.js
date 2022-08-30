'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('animal', [
      {
        fk_id_pessoa: 3,
        id_fazenda : 1,
        no_animal: 'Boi Gordofredo',
        no_raca: 'Gir',
        sexo: 'M',
        vr_peso: 500.5472,
        dt_nascimento: new Date(2015, 4, 27)
      },
      {
        fk_id_pessoa: 2,
        id_fazenda : 1,
        no_animal: 'Vaca Marietta',
        no_raca: 'Galloway',
        sexo: 'F',
        vr_peso: 550.47,
        dt_nascimento: new Date(2012, 3, 30)
      },
      {
        fk_id_pessoa: 4,
        id_fazenda : 5,
        no_animal: 'Boi Jailson',
        no_raca: 'Hereford',
        sexo: 'M',
        vr_peso: 520.3824,
        dt_nascimento: new Date(2010, 9, 2)
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('animal', null, {});
  }
};
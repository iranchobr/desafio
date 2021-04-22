'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('animal', [
      {
        fk_id_people: 2,
        id_fazenda: "A09B89C5",
        no_animal: "Boi 001",
        no_raca: "Holandês",
        sexo: "M",
        vr_peso: 596.23,
        dt_nascimento: "2017-01-17",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fk_id_people: 4,
        id_fazenda: "A5D963C4",
        no_animal: "Vaca 001",
        no_raca: "Nelore",
        sexo: "F",
        vr_peso: 436.77,
        dt_nascimento: "2016-06-17",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fk_id_people: 3,
        id_fazenda: "A64CA95F",
        no_animal: "Vaca 002",
        no_raca: "Senepol",
        sexo: "F",
        vr_peso: 501.28,
        dt_nascimento: "2017-04-10",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fk_id_people: 2,
        id_fazenda: "A564FD34",
        no_animal: "Boi 002",
        no_raca: "Nelore",
        sexo: "M",
        vr_peso: 587.31,
        dt_nascimento: "2019-02-04",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fk_id_people: 1,
        id_fazenda: "A56C63K2",
        no_animal: "Boi 003",
        no_raca: "Senepol",
        sexo: "M",
        vr_peso: 621.09,
        dt_nascimento: "2020-04-01",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('animal', null, {});
  }
};

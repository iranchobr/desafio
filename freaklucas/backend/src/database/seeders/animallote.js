const { Sequelize } = require("sequelize");
const AnimalLote = require("../../models/AnimalLote");
const Animal = require("../../models/Animal");
const Lote = require("../../models/Lote");

module.exports = {
  async up(queryInterface, Sequelize) {
    const animals = await Animal.findAll();
    const lotes = await Lote.findAll();

    const animalLotes = [];

    for (const animal of animals) {
      for (const lote of lotes) {
        animalLotes.push({
          fk_id_animal: animal.id,
          fk_id_lote: lote.id,
          dt_entrada: new Date(),
          dt_ultima_movimentacao: new Date(),
          ic_bezerro: Math.random() >= 0.5,
        });
      }
    }

    return AnimalLote.bulkCreate(animalLotes);
  },

  async down(queryInterface, Sequelize) {
    return AnimalLote.destroy({
      where: {},
      truncate: true,
    });
  },
};

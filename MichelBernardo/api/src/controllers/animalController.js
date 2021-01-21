const Animal = require('../models/Animal');

module.exports = {
  async index(req, res) {
    let results = await Animal.findAll();
    const animals = results.rows;

    if (animals == 0) {
      return res.status(406).json({ error: true, message: 'empty table' });
    } else {
      return res.json(animals);
    }
  },

  async find(req, res) {
    const animalId = req.params.id;
    const animal = await Animal.findOne(animalId);

    if (animal == 0) {
      return res.status(406).json({ error: true, message: 'empty' });
    } else {
      return res.json(animal);
    }
  },

  async post(req, res) {
    const data = req.body;
    await Animal.createAnimal(data);
    return res.status(201).json(data);
  },

  async put(req, res) {
    const animalId = req.params.id;
    const animal = await Animal.findOne(animalId);
    const data = req.body;

    if (!animal) {
      return res.status(404).json({ error: true, message: 'Not found' });
    } else {
      await Animal.updateAnimal({
        id: animalId,
        fk_id_pessoa: data.fk_id_pessoa,
        id_fazenda: data.id_fazenda,
        no_animal: data.no_animal,
        no_raca: data.no_raca,
        sexo: data.sexo,
        vr_peso: data.vr_peso,
        dt_nascimento: data.dt_nascimento,
      });
      return res.status(202).json({ error: false, message: 'updated!' });
    }
  },

  async delete(req, res) {
    const animalId = req.params.id;
    const animal = await Animal.findOne(animalId);

    if (!animal) {
      return res.status(404).json({ error: true, message: 'Not found!' });
    } else {
      await Animal.deleteAnimal(animalId);
      return res
        .status(200)
        .json({ error: false, message: 'Register deleted!' });
    }
  },
};

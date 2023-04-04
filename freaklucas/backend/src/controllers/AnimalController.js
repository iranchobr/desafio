const Animal = require("../models/Animal");
const sequelize = require("../../index").sequelize;

module.exports = {
  async create(req, res) {
    const { id_user } = req.params;
    const { id_fazenda, no_animal, no_raca, sexo, vr_peso, dt_nascimento } =
      req.body;
    const animal = {
      id_fazenda,
      fk_id_pessoa: id_user,
      no_animal,
      no_raca,
      sexo,
      vr_peso,
      dt_nascimento,
    };

    try {
      const newAnimal = await Animal.create(animal);
      return res.status(201).json({ animal: newAnimal });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const animals = await Animal.findAll();
      return res.status(200).json({ animals });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const animal = await Animal.findByPk(id);
      if (!animal) {
        return res.status(404).json({ error: "Animal not found" });
      }
      return res.status(200).json({ animal });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Animal.update(req.body, {
        where: { id },
        returning: true,
      });
      if (!updated) {
        return res.status(404).json({ error: "Animal not found" });
      }
      return res.status(200).json({ animal: updated });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Animal.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: "Animal not found" });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

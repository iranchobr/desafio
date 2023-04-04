const { AnimalLote } = require("../models/AnimalLote");
const sequelize = require("../../index").sequelize;

module.exports = {
  async getAll(req, res) {
    try {
      const animalLotes = await AnimalLote.findAll({
        include: [
          {
            model: models.Animal,
            as: "animal",
          },
          {
            model: models.Lote,
            as: "lote",
          },
        ],
      });

      return res.json(animalLotes);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const { id } = req.params;

      const animalLote = await AnimalLote.findByPk(id, {
        include: [
          {
            model: models.Animal,
            as: "animal",
          },
          {
            model: models.Lote,
            as: "lote",
          },
        ],
      });

      if (!animalLote) {
        return res.status(404).json({ error: "AnimalLote not found" });
      }

      return res.json(animalLote);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const {
        fk_id_animal,
        fk_id_lote,
        dt_entrada,
        dt_saida,
        dt_ultima_movimentacao,
        ic_bezerro,
      } = req.body;

      const animalLote = await AnimalLote.create({
        fk_id_animal,
        fk_id_lote,
        dt_entrada,
        dt_saida,
        dt_ultima_movimentacao,
        ic_bezerro,
      });

      return res.json(animalLote);
    } catch (error) {
      return res.status(500).json({ error: "Falha ao criar registro" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      const [updated] = await AnimalLote.update(req.body, {
        where: { id },
      });

      if (!updated) {
        return res.status(404).json({ error: "AnimalLote not found" });
      }

      const animalLote = await AnimalLote.findByPk(id, {
        include: [
          {
            model: models.Animal,
            as: "animal",
          },
          {
            model: models.Lote,
            as: "lote",
          },
        ],
      });

      return res.json(animalLote);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deleted = await AnimalLote.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ error: "AnimalLote not found" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};

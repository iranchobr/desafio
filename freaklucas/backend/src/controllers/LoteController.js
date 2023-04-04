const Lote = require("../models/Lote");
const Sequelize = require("sequelize");

module.exports = {
  async list(req, res) {
    const lotes = await Lote.findAll();
    return res.status(200).json({ lotes });
  },

  async find(req, res) {
    const { id } = req.params;
    const lote = await Lote.findByPk(id);
    if (!lote) {
      return res.status(404).json({ error: "Lote not found" });
    }
    return res.status(200).json({ lote });
  },

  async create(req, res) {
    try {
      const { no_lote, ds_lote } = req.body;
      const lote = await Lote.create({ no_lote, ds_lote });
      return res.json(lote);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Ocorreu um erro ao criar o lote." });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const [updated] = await Lote.update(req.body, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Lote not found" });
    }
    return res.status(200).json({ lote: updated });
  },

  async delete(req, res) {
    const { id } = req.params;
    const deleted = await Lote.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Lote not found" });
    }
    return res.status(204).send();
  },
};

const Pessoa = require("../models/Pessoa");

module.exports = {
  create(req, res) {
    const { no_pessoa, no_email, endereco, sexo, ic_ativo } = req.body;

    const pessoa = {
      no_pessoa,
      no_email,
      endereco,
      sexo,
      ic_ativo,
    };

    Pessoa.create(pessoa)
      .then((pessoa) => {
        res.json(pessoa);
      })
      .catch((e) => res.send(e));
  },

  async list(req, res) {
    try {
      const pessoas = await Pessoa.findAll();
      return res.status(200).json(pessoas);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async find(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await Pessoa.findByPk(id);
      if (!pessoa) {
        return res.status(404).json({ error: "Pessoa não encontrada." });
      }
      return res.status(200).json(pessoa);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Pessoa.update(req.body, {
        where: { id },
      });
      if (!updated) {
        return res.status(404).json({ error: "Pessoa não encontrada." });
      }
      const pessoa = await Pessoa.findByPk(id);
      return res.status(200).json(pessoa);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async showAnimals(req, res) {
    try {
      const { id } = req.params;
      const animais = await Animal.findAll({ where: { fk_id_pessoa: id } });
      if (!animais.length) {
        return res.status(404).json({ error: "Esta pessoa não tem animais." });
      }
      return res.status(200).json(animais);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Pessoa.destroy({
        where: { id },
      });
      if (!deleted) {
        return res.status(404).json({ error: "Pessoa não encontrada." });
      }
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};

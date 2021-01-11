const AnimalBatchRegister = require('../models/AnimalBatchRegister');

module.exports = {
  async index(req, res) {
    let results = await AnimalBatchRegister.findAll();
    const animalBatchRegisters = results.rows;

    if (animalBatchRegisters == 0) {
      return res.status(406).json({ error: true, message: 'empty table' });
    } else {
      return res.json(animalBatchRegisters);
    }
  },

  async find(req, res) {
    const registerId = req.params.id;
    const register = await AnimalBatchRegister.findOne(registerId);

    if (register == 0) {
      return res.status(406).json({ error: true, message: 'empty' });
    } else {
      return res.json(register);
    }
  },

  async post(req, res) {
    const data = req.body;
    await AnimalBatchRegister.createRegister(data);
    return res.status(201).json(data);
  },

  async put(req, res) {
    const registerId = req.params.id;
    const register = await AnimalBatchRegister.findOne(registerId);
    const data = req.body;

    if (!register) {
      return res.status(404).json({ error: true, message: 'Not found' });
    } else {
      await AnimalBatchRegister.updateRegister({
        id: registerId,
        fk_id_animal: data.fk_id_animal,
        fk_id_lote: data.fk_id_lote,
        dt_entrada: data.dt_entrada,
        dt_saida: data.dt_saida,
        dt_ultima_movimentacao: data.dt_ultima_movimentacao,
        ic_bezerro: data.ic_bezerro,
      });
      return res.status(202).json({ error: false, message: 'updated!' });
    }
  },

  async delete(req, res) {
    const registerId = req.params.id;
    const register = await AnimalBatchRegister.findOne(registerId);

    if (!register) {
      return res.status(404).json({ error: true, message: 'Not found!' });
    } else {
      await AnimalBatchRegister.deleteRegister(registerId);
      return res
        .status(200)
        .json({ error: false, message: 'Register deleted!' });
    }
  },
};

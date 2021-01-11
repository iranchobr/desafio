const Batch = require('../models/Batch');

module.exports = {
  async index(req, res) {
    let results = await Batch.findAll();
    const batches = results.rows;

    if (batches == 0) {
      return res.status(406).json({ error: true, message: 'empty table' });
    } else {
      return res.json(batches);
    }
  },

  async find(req, res) {
    const batchId = req.params.id;
    const batch = await Batch.findOne(batchId);

    if (batch == 0) {
      return res.status(406).json({ error: true, message: 'empty' });
    } else {
      return res.json(batch);
    }
  },

  async post(req, res) {
    const data = req.body;
    await Batch.createBatch(data);
    return res.status(201).json(data);
  },

  async put(req, res) {
    const batchId = req.params.id;
    const batch = await Batch.findOne(batchId);
    const data = req.body;

    if (!batch) {
      return res.status(404).json({ error: true, message: 'Not found' });
    } else {
      await Batch.updateBatch({
        id: batchId,
        no_lote: data.no_lote,
        ds_lote: data.ds_lote,
      });
      return res.status(202).json({ error: false, message: 'updated!' });
    }
  },

  async delete(req, res) {
    const batchId = req.params.id;
    const batch = await Batch.findOne(batchId);

    if (!batch) {
      return res.status(404).json({ error: true, message: 'Not found!' });
    } else {
      await Batch.deleteBatch(batchId);
      return res
        .status(200)
        .json({ error: false, message: 'Register deleted!' });
    }
  },
};

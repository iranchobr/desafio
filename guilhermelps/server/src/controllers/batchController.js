const db = require('../models')

const getAllBatches = async (req, res) => {
  try {
    const batches = await db.batch.findAll()
    return res.status(200).json(batches)
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const deleteBatch = async (req, res) => {
  try {
    await db.batch.destroy(
      { where: { id: req.params.id } }
    )
    return res.status(200).json({
      message: 'Lote removido com sucesso.'
    })
  } 
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const createBatch = async (req, res) => {
  try {
    const batch = await db.batch.create(req.body)
    return res.status(201).json({
      batch: batch,
      message: 'Lote cadastrado com sucesso.'
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const updateBatch = async (req, res) => {
  try {
    await db.batch.update(
      req.body,
      { where: { id: req.params.id } }
    )
    return res.status(200).json({
      message: 'Lote atualizado com sucesso.'
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const getBatchById = async (req,res) => {
  try {
    const batch = await db.batch.findOne(
      { where: { id: req.params.id } }
    )
    return res.status(200).json({
      batch: batch
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

module.exports = {
  getAllBatches,
  deleteBatch,
  createBatch,
  updateBatch,
  getBatchById
}
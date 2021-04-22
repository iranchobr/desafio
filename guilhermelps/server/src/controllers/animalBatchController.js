const db = require('../models')

const getAllAnimalsBatches = async (req, res) => {
  try {
    const animalsBatches = await db.animal_batch.findAll({
      include: [
        { model: db.animal, as: 'animal' },
        { model: db.batch, as: 'batch' }
      ]
    })
    return res.status(200).json(animalsBatches)
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const deleteAnimalBatch = async (req, res) => {
  try {
    await db.animal_batch.destroy(
      { where: { id: req.params.id } }
    )
    return res.status(200).json({
      message: 'Registro removido com sucesso.'
    })
  } 
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const createAnimalBatch = async (req, res) => {
  try {
    const animalBatch = await db.animal_batch.create(req.body)
    return res.status(201).json({
      animalBatch: animalBatch,
      message: 'Registro cadastrado com sucesso.'
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const updateAnimalBatch = async (req, res) => {
  try {
    await db.animal_batch.update(
      req.body,
      { where: { id: req.params.id } }
    )
    return res.status(200).json({
      message: 'Registro atualizado com sucesso.'
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const getAnimalBatchById = async (req,res) => {
  try {
    const animalBatch = await db.animal_batch.findOne({
      where: { id: req.params.id },
      include: [
        { model: db.animal, as: 'animal' },
        { model: db.batch, as: 'batch' }
      ]
    })
    return res.status(200).json({
      animalBatch: animalBatch
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

module.exports = {
  getAllAnimalsBatches,
  deleteAnimalBatch,
  createAnimalBatch,
  updateAnimalBatch,
  getAnimalBatchById
}
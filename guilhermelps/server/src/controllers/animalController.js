const db = require('../models')

const getAllAnimals = async (req, res) => {
  try {
    const animals = await db.animal.findAll(
      { include: { association: 'people' } }
    )
    return res.status(200).json(animals)
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const deleteAnimal = async (req, res) => {
  try {
    await db.animal.destroy(
      { where: { id: req.params.id } }
    )
    return res.status(200).json({
      message: 'Animal removido com sucesso.'
    })
  } 
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const createAnimal = async (req, res) => {
  try {
    const animal = await db.animal.create(req.body)
    return res.status(201).json({
      animal: animal,
      message: 'Animal cadastrado com sucesso.'
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const updateAnimal = async (req, res) => {
  try {
    await db.animal.update(
      req.body,
      { where: { id: req.params.id } }
    )
    return res.status(200).json({
      message: 'Animal atualizado com sucesso.'
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const getAnimalById = async (req,res) => {
  try {
    const animal = await db.animal.findOne({
      where: { id: req.params.id },
      include: { association: 'people' }
    })
    return res.status(200).json({
      animal: animal
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

module.exports = {
  getAllAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimal,
  getAnimalById
}
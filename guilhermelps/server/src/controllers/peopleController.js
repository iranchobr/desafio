const db = require('../models')

const getAllPeople = async (req, res) => {
  try {
    const people = await db.people.findAll()
    return res.status(200).json(people)
  } 
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const deletePeople = async (req, res) => {
  try {
    await db.people.destroy(
      { where: { id: req.params.id } }
    )
    return res.status(200).json({
      message: 'Pessoa removida com sucesso.'
    })
  } 
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const createPeople = async (req, res) => {
  try {
    const people = await db.people.create(req.body)
    return res.status(201).json({
      people: people,
      message: 'Pessoa cadastrada com sucesso.'
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const updatePeople = async (req, res) => {
  try {
    await db.people.update(
      req.body,
      { where: { id: req.params.id } }
    )
    return res.status(200).json({
      message: 'Pessoa atualizada com sucesso.'
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

const getByIdPeople = async (req,res) => {
  try {
    const people = await db.people.findOne(
      { where: { id: req.params.id } }
    )
    return res.status(200).json({
      people: people
    })
  }
  catch (e) {
    return res.status(500).json(e.message)
  }
}

module.exports = {
  getAllPeople,
  deletePeople,
  createPeople,
  updatePeople,
  getByIdPeople
}
const { Router } = require('express')

const {
  getAllAnimals,
  deleteAnimal,
  createAnimal,
  updateAnimal,
  getAnimalById
} = require('../controllers/animalController')

const router = Router()

router.get('/animal', getAllAnimals)
router.post('/animal', createAnimal)
router.delete('/animal/:id', deleteAnimal)
router.put('/animal/:id', updateAnimal)
router.get('/animal/:id', getAnimalById)

module.exports = router
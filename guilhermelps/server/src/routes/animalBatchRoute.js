const { Router } = require('express')

const {
  getAllAnimalsBatches,
  deleteAnimalBatch,
  createAnimalBatch,
  updateAnimalBatch,
  getAnimalBatchById
} = require('../controllers/animalBatchController')

const router = Router()

router.get('/animal-batch', getAllAnimalsBatches)
router.post('/animal-batch', createAnimalBatch)
router.delete('/animal-batch/:id', deleteAnimalBatch)
router.put('/animal-batch/:id', updateAnimalBatch)
router.get('/animal-batch/:id', getAnimalBatchById)

module.exports = router
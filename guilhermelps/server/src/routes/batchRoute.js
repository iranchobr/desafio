const { Router } = require('express')

const {
  getAllBatches,
  deleteBatch,
  createBatch,
  updateBatch,
  getBatchById
} = require('../controllers/batchController')

const router = Router()

router.get('/batch', getAllBatches)
router.post('/batch', createBatch)
router.delete('/batch/:id', deleteBatch)
router.put('/batch/:id', updateBatch)
router.get('/batch/:id', getBatchById)

module.exports = router
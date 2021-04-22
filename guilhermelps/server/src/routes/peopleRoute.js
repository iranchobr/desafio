const { Router } = require('express')

const { 
  getAllPeople,
  deletePeople,
  createPeople,
  updatePeople,
  getByIdPeople
} = require('../controllers/peopleController')

const router = Router()

router.get('/people', getAllPeople)
router.post('/people', createPeople)
router.delete('/people/:id', deletePeople)
router.put('/people/:id', updatePeople)
router.get('/people/:id', getByIdPeople)

module.exports = router
const express = require('express');
const AnimaisController = require('../controllers/AnimaisController');
const router = express.Router();

router.get('/', AnimaisController.index);
router.get('/:id_animal', AnimaisController.show);
router.post('/:id_user', AnimaisController.create);
router.put('/:id_animal', AnimaisController.update);
router.delete('/:id_animal', AnimaisController.delete);

module.exports = router;
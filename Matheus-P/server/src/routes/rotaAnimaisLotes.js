const express = require('express');
const AnimaisLotesController = require('../controllers/AnimaisLotesController');
const router = express.Router();

router.get('/', AnimaisLotesController.index);
router.get('/:id_relacao', AnimaisLotesController.show);
router.post('/:id_animal/:id_lote', AnimaisLotesController.create);
router.put('/:id_relacao', AnimaisLotesController.update);
router.delete('/:id_relacao', AnimaisLotesController.delete);

module.exports = router;
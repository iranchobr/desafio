const express = require('express');
const LotesController = require('../controllers/LotesController');
const router = express.Router();

router.get('/', LotesController.index);
router.get('/:id_lote', LotesController.show);
router.post('/', LotesController.create);
router.put('/:id_lote', LotesController.update);
router.delete('/:id_lote', LotesController.delete);

module.exports = router;
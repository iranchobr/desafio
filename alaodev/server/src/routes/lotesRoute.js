const { Router } = require('express');
const LotesController = require('../controllers/LotesController');

const router = Router();

router.get('/lotes', LotesController.getLotes);
router.get('/lotes/:id', LotesController.getLote);
router.post('/lotes', LotesController.setLote);
router.patch('/lotes/:id', LotesController.updateLote);
router.delete('/lotes/:id', LotesController.deleteLote);

module.exports = router;
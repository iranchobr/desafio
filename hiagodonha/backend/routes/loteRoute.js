const { Router } = require('express');
const LotesRest = require('../rest/loteRest')
const router = Router();

router.get('/lotes', LotesRest.getLotes);
router.get('/lotes/:id', LotesRest.getLote);
router.post('/lotes', LotesRest.setLote);
router.patch('/lotes/:id', LotesRest.updateLote);
router.delete('/lotes/:id', LotesRest.deleteLote);

module.exports = router;
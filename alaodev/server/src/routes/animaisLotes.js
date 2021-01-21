const { Router } = require('express');
const AnimaisLotesController = require('../controllers/AnimaisLotesController');

const router = Router();

router.get('/animais_x_lotes', AnimaisLotesController.getAnimaisLotes);
router.get('/animais_x_lotes/:id', AnimaisLotesController.getAnimalLoteById);
router.post('/animais_x_lotes', AnimaisLotesController.setAnimalLote);
router.patch('/animais_x_lotes/:id', AnimaisLotesController.updateAnimalLote);
router.delete('/animais_x_lotes/:id', AnimaisLotesController.deleteAnimalLote);

module.exports = router;
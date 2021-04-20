const { Router } = require('express');
const AnimaisLotesRest = require('../rest/animalLoteRest');

const router = Router();

router.get('/animais_x_lotes', AnimaisLotesRest.getAnimaisLotes);
router.get('/animais_x_lotes/:id', AnimaisLotesRest.getAnimalLoteById);
router.post('/animais_x_lotes', AnimaisLotesRest.setAnimalLote);
router.patch('/animais_x_lotes/:id', AnimaisLotesRest.updateAnimalLote);
router.delete('/animais_x_lotes/:id', AnimaisLotesRest.deleteAnimalLote);

module.exports = router;
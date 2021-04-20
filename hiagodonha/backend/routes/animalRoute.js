const { Router } = require('express');
const AnimaisRest = require('../rest/animalRest');

const router = Router();

router.get('/animais', AnimaisRest.getAnimais);
router.get('/animais/:id', AnimaisRest.getAnimalById);
router.post('/animais', AnimaisRest.setAnimal);
router.patch('/animais/:id', AnimaisRest.updateAnimal);
router.delete('/animais/:id', AnimaisRest.deleteAnimal);

module.exports = router;
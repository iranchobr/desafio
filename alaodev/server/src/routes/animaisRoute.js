const { Router } = require('express');
const AnimaisController = require('../controllers/AnimaisController');

const router = Router();

router.get('/animais', AnimaisController.getAnimais);
router.get('/animais/:id', AnimaisController.getAnimalById);
router.post('/animais', AnimaisController.setAnimal);
router.patch('/animais/:id', AnimaisController.updateAnimal);
router.delete('/animais/:id', AnimaisController.deleteAnimal);

module.exports = router;
const express = require('express');
const PessoasController = require('../controllers/PessoasController');
const router = express.Router();

router.get('/', PessoasController.index);
router.get('/:id_user', PessoasController.show);
router.get('/animais/:id_user', PessoasController.showAnimals);
router.post('/', PessoasController.create);
router.put('/:id_user', PessoasController.update);
router.delete('/:id_user', PessoasController.delete);

module.exports = router;
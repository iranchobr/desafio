const express = require('express');

/* Import Controllers */
const PessoaController = require('./controllers/PessoaController');
const AnimalController = require('./controllers/AnimalController');
const LoteController = require('./controllers/LoteController');
const AnimalLoteController = require('./controllers/AnimalLoteController');

/*Instaciando Router */
const router = express.Router();

/*Rota Raiz */
router.get('/', PessoaController.index);

/* Rotas Pessoa */
router.get('/pessoas', PessoaController.index);
router.get('/pessoas/:id_user', PessoaController.show);
router.get('/pessoas/animais/:id_user', PessoaController.showAnimals);
router.post('/pessoas', PessoaController.store);
router.put('/pessoas/:id_user', PessoaController.update);
router.delete('/pessoas/:id_user', PessoaController.delete);

/*Rota Animais */
router.get('/animais/:id_animal', AnimalController.show);
router.get('/animais', AnimalController.index);
router.post('/animais/:id_user', AnimalController.store);
router.put('/animais/:id_animal', AnimalController.update);
router.delete('/animais/:id_animal', AnimalController.delete);

router.post('/animais/:id_animal/:id_lote', AnimalController.teste);

/*Rota Lote */
router.get('/lotes', LoteController.index);
router.get('/lotes/:id_lote', LoteController.show);
router.post('/lotes', LoteController.store);
router.put('/lotes/:id_lote', LoteController.update);
router.delete('/lotes/:id_lote', LoteController.delete);

/*Rota Animais Lotes */
router.post('/animais_lote/:id_animal/:id_lote', AnimalLoteController.store);
router.get('/animais_lote', AnimalLoteController.index);
router.get('/animais_lote/:id_relacao', AnimalLoteController.show);
router.put('/animais_lote/:id_relacao', AnimalLoteController.update);
router.delete('/animais_lote/:id_relacao', AnimalLoteController.delete);






module.exports = router;
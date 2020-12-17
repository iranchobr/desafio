const express = require('express');
const router = express.Router();
const pessoaController = require("../app/controller/pessoaController");
const animalController = require("../app/controller/animalController");
const loteController = require("../app/controller/loteController");
const animaloteController = require("../app/controller/animaloteController");

router.post('/pessoa', pessoaController.store);
router.get('/pessoa', pessoaController.get);
router.get('/pessoa/:id', pessoaController.get);
router.put('/pessoa/:id', pessoaController.update);
router.delete('/pessoa/:id', pessoaController.delete);

router.post('/lote', loteController.store);
router.get('/lote', loteController.get);
router.get('/lote/:id', loteController.get);
router.put('/lote/:id', loteController.update);
router.delete('/lote/:id', loteController.delete);

router.post('/animal', animalController.store);
router.get('/animal', animalController.get);
router.get('/animal/:id', animalController.get);
router.put('/animal/:id', animalController.update);
router.delete('/animal/:id', animalController.delete);

router.post('/alocar', animaloteController.store);
router.get('/alocar', animaloteController.get);
router.get('/alocar/:id', animaloteController.get);
router.put('/alocar/:id', animaloteController.update);
router.delete('/alocar/:id', animaloteController.delete);

module.exports =  router;

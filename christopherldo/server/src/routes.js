const express = require('express');
const router = express.Router();

const {
  pessoaController,
  animalController,
  animalLoteController,
  animalXLoteController,
} = require('./app/controllers');

const {
  pessoaValidator,
  animalValidator,
  animalLoteValidator,
  animalXLoteValidator,
} = require('./app/validators');

// Know if server is on by requesting this route
router.get('/ping', (req, res) => {
  res.json({
    pong: true,
  });
});

/* 
 * Pessoa related routes
 */
router.get('/pessoa/:id',
  pessoaValidator.readById,
  pessoaController.readById,
);

router.put('/pessoa/:id',
  pessoaValidator.update,
  pessoaController.update,
);

router.patch('/pessoa/:id',
  pessoaValidator.toggleActivate,
  pessoaController.toggleActivate,
);

router.delete('/pessoa/:id',
  pessoaValidator.delete,
  pessoaController.delete,
);

router.get('/pessoa/',
  pessoaController.readAll,
);

router.post('/pessoa/',
  pessoaValidator.create,
  pessoaController.create,
);

/* 
 * Animal related routes
 */
router.get('/animal/:id',
  animalValidator.readById,
  animalController.readById,
);

router.put('/animal/:id',
  animalValidator.update,
  animalController.update,
);

router.delete('/animal/:id',
  animalValidator.delete,
  animalController.delete,
);

router.get('/animal/',
  animalController.readAll,
);

router.post('/animal/',
  animalValidator.create,
  animalController.create,
);

/* 
 * Lote related routes
 */
router.get('/lote/:id',
  animalLoteValidator.readById,
  animalLoteController.readById,
);

router.put('/lote/:id',
  animalLoteValidator.update,
  animalLoteController.update,
);

router.delete('/lote/:id',
  animalLoteValidator.delete,
  animalLoteController.delete,
);

router.get('/lote/',
  animalLoteController.readAll,
);

router.post('/lote/',
  animalLoteValidator.create,
  animalLoteController.create,
);

/* 
 * Animal and Lote relations related routes
 */
router.get('/animal-x-lote/:id',
  animalXLoteValidator.readById,
  animalXLoteController.readById,
);

router.put('/animal-x-lote/:id',
  animalXLoteValidator.update,
  animalXLoteController.update,
);

router.delete('/animal-x-lote/:id',
  animalXLoteValidator.delete,
  animalXLoteController.delete,
);

router.get('/animal-x-lote/',
  animalXLoteController.readAll,
);

router.post('/animal-x-lote/',
  animalXLoteValidator.create,
  animalXLoteController.create,
);

module.exports = router;
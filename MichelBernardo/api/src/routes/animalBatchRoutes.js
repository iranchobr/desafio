const animalBatchRegister = require('../controllers/animalBatchRegisterController');

module.exports = (routes) => {
  routes.get('/animalRegisters', animalBatchRegister.index);
  routes.post('/animalRegisters', animalBatchRegister.post);
  routes.get('/animalRegisters/:id', animalBatchRegister.find);
  routes.put('/animalRegisters/:id', animalBatchRegister.put);
  routes.delete('/animalRegisters/:id', animalBatchRegister.delete);
};

const animal = require('../controllers/animalController');

module.exports = (routes) => {
  routes.get('/animals', animal.index);
  routes.post('/animals', animal.post);
  routes.get('/animals/:id', animal.find);
  routes.put('/animals/:id', animal.put);
  routes.delete('/animals/:id', animal.delete);
};

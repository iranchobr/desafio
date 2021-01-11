const batch = require('../controllers/batchController');

module.exports = (routes) => {
  routes.get('/batches', batch.index);
  routes.post('/batches', batch.post);
  routes.get('/batches/:id', batch.find);
  routes.put('/batches/:id', batch.put);
  routes.delete('/batches/:id', batch.delete);
};

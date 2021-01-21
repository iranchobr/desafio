const person = require('../controllers/personController');

module.exports = (routes) => {
  routes.get('/people', person.index);
  routes.post('/people', person.post);
  routes.get('/people/:id', person.find);
  routes.put('/people/:id', person.put);
  routes.delete('/people/:id', person.delete);
};

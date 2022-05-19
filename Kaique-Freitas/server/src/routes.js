const { AnimalsController } = require('./controllers/AnimalsController');
const { PeopleController } = require('./controllers/PeopleController');
const { LotsController } = require('./controllers/LotsController');

const routes = require('express').Router();

const lots = '/lots';
const people = '/people';
const animals = '/animals';

const lotsController = new LotsController();
const peopleController = new PeopleController();
const animalsController = new AnimalsController();

routes.get(people, (_, response) => {
  peopleController.index(response)
});
routes.get(`${people}/:id`, (request, response) => {
  peopleController.show(request, response)
});
routes.post(people, (request, response) => {
  peopleController.save(request, response);
});
routes.delete(`${people}/:id`, (request, response) => {
  peopleController.delete(request, response)
});

routes.get(animals, (_, response) => {
  animalsController.index(response);
});
routes.get(`${animals}/:id`, (request, response) => {
  animalsController.show(request, response);
});
routes.post(animals, (request, response) => {
  animalsController.save(request, response);
});
routes.delete(`${animals}/:id`, (request, response) => {
  animalsController.delete(request, response);
});

routes.get(lots, (_, response) => {
  lotsController.index(response);
});
routes.get(`${lots}/:id`, (request, response) => {
  lotsController.show(request, response);
});
routes.post(lots, (request, response) => {
  lotsController.save(request, response);
});
routes.delete(`${lots}/:id`, (request, response) => {
  lotsController.delete(request, response);
});

module.exports = routes;

const {
  validationResult,
  matchedData
} = require('express-validator');

const {
  animalLoteService
} = require('../services');

module.exports = {
  create: async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty() === false) {
      res.status(400).send({
        error: errors.mapped(),
      });
      return;
    };

    const data = matchedData(req);

    const json = {
      error: '',
      animalLote: {},
    };

    try {
      json.animalLote = await animalLoteService.create(data);
    } catch (error) {
      json.error = error.message;
    };

    if (json.error) {
      res.status(500).send(json);
      return;
    };

    res.json(json);
  },
  readAll: async (req, res) => {
    const json = {
      error: '',
      animalLoteArray: [],
    };

    try {
      json.animalLoteArray = await animalLoteService.readAll();
    } catch (error) {
      json.error = error.message;
    };

    if (json.error) {
      res.status(500).send(json);
      return;
    };

    res.json(json);
  },
  readById: async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty() === false) {
      res.status(400).send({
        error: errors.mapped(),
      });
      return;
    };

    const data = matchedData(req);
    const id = data.id;

    const json = {
      error: '',
      animalLote: {},
    };

    try {
      json.animalLote = await animalLoteService.readById(id);
    } catch (error) {
      json.error = error.message;
    };

    if (json.error) {
      res.status(500).send(json);
      return;
    };

    res.json(json);
  },
  update: async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty() === false) {
      res.status(400).send({
        error: errors.mapped(),
      });
      return;
    };

    const data = matchedData(req);
    const id = data.id;

    const json = {
      error: '',
      animalLote: {},
    };

    try {
      await animalLoteService.update(data);
      json.animalLote = await animalLoteService.readById(id);
    } catch (error) {
      json.error = error.message;
    };

    if (json.error) {
      res.status(500).send(json);
      return;
    };

    res.json(json);
  },
  delete: async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty() === false) {
      res.status(400).send({
        error: errors.mapped(),
      });
      return;
    };

    const data = matchedData(req);
    const id = data.id;

    const json = {
      error: '',
    };

    try {
      await animalLoteService.delete(id);
    } catch (error) {
      json.error = error.message;
    };

    if (json.error) {
      res.status(500).send(json);
      return;
    };

    res.json(json);
  },
}
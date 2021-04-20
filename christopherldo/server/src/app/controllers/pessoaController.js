const {
  validationResult,
  matchedData
} = require('express-validator');

const {
  pessoaService
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
      pessoa: {},
    };

    try {
      json.pessoa = await pessoaService.create(data);
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
      pessoaArray: [],
    };

    try {
      json.pessoaArray = await pessoaService.readAll();
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
      pessoa: {},
    };

    try {
      json.pessoa = await pessoaService.readById(id);
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
      pessoa: {},
    };

    try {
      await pessoaService.update(data);
      json.pessoa = await pessoaService.readById(id);
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
      await pessoaService.delete(id);
    } catch (error) {
      json.error = error.message;
    };

    if (json.error) {
      res.status(500).send(json);
      return;
    };

    res.json(json);
  },
  toggleActivate: async (req, res) => {
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
      pessoa: {},
    };

    try {
      await pessoaService.toggleActivate(id);
      json.pessoa = await pessoaService.readById(id);
    } catch (error) {
      json.error = error.message;
    };

    if (json.error) {
      res.status(500).send(json);
      return;
    };

    res.json(json);
  },
};
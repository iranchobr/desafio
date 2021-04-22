const {
  validationResult,
  matchedData
} = require('express-validator');

const {Op} = require('sequelize');

const {
  animalXLoteService,
  animalService,
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
      animalXLote: {},
    };

    try {
      data.dt_ultima_movimentacao = new Date();
      json.animalXLote = await animalXLoteService.create(data);
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
      errorArray: [],
      error: '',
      animalXLoteArray: [],
    };

    const options = {};
    const q = req.query.q;

    if(q) {
      options.where = {
        [Op.or]: [
          { id: {
            [Op.like]: `%${q}%`
            }
          },
        ]
      };
    };

    try {
      const animalXLoteArray = await animalXLoteService.readAll(options); 
      json.animalXLoteArray = animalXLoteArray.map(alocacao => {
        return {
          ...alocacao.dataValues,
          animal: {},
          lote: {},
        };
      })
    } catch (error) {
      json.errorArray.push(error.message);
    };

    for(alocacao of json.animalXLoteArray){
      const animalPromise = new Promise((resolve, reject) => {
        resolve(animalService.readById(alocacao.fk_id_animal));
      });
      const lotePromise = new Promise((resolve, reject) => {
        resolve(animalLoteService.readById(alocacao.fk_id_lote));
      });

      try {
        const [animal, lote] = await Promise.all([animalPromise, lotePromise]);
        alocacao.animal = animal;
        alocacao.lote = lote;
      } catch (error) {
        json.errorArray.push(error.message);
      }
    };

    if (json.errorArray.length > 0) {
      json.error = json.errorArray.join(', ');
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
      animalXLote: {},
    };

    try {
      json.animalXLote = await animalXLoteService.readById(id);
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
    const dateNow = new Date();
    data.dt_ultima_movimentacao = dateNow;
    
    const id = data.id;

    const json = {
      error: '',
      animalXLote: {},
    };

    try {
      await animalXLoteService.update(data);
      json.animalXLote = await animalXLoteService.readById(id);
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
      await animalXLoteService.delete(id);
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
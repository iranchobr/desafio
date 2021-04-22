const {
  validationResult,
  matchedData
} = require('express-validator');

const {Op} = require('sequelize');

const {
  animalService
} = require('../services');
const pessoaService = require('../services/pessoaService');

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
      animal: {},
    };

    try {
      // Armazenar em gramas na base de dados para maior precisão
      data.vr_peso = data.vr_peso * 1000;
      json.animal = await animalService.create(data);
    } catch (error) {
      json.error = error.message;
    };

    if (json.error) {
      res.status(500).send(json);
      return;
    };

    // Converter de volta para kg na hora da exibição
    json.animal.vr_peso = json.animal.vr_peso / 1000;

    res.json(json);
  },
  readAll: async (req, res) => {
    const json = {
      errorArray: [],
      error: '',
      animalArray: [],
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
          { no_animal: {
            [Op.like]: `%${q}%`
            }
          },
          {
            no_raca: {
              [Op.like]: `%${q}%`
            }
          },
          {
            sexo: {
              [Op.like]: `%${q}%`
            }
          },
        ]
      };
    };

    try {
      const animalArray = await animalService.readAll(options);
      json.animalArray = animalArray.map(animal => {
        return {
          ...animal.dataValues,
          pessoa: {},
          vr_peso: animal.vr_peso / 1000
        }
      });
    } catch (error) {
      json.errorArray.push(error.message);
    };

    for(animal of json.animalArray){
      try {
        animal.pessoa = await pessoaService.readById(animal.fk_id_pessoa); 
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
      animal: {},
    };

    try {
      json.animal = await animalService.readById(id);
      // Mostrar em kg
      json.animal.vr_peso = json.animal.vr_peso / 1000;
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
      animal: {},
    };

    try {
      // Armazenar em gramas na base de dados para maior precisão
      if (data.vr_peso) {
        data.vr_peso = data.vr_peso * 1000
      };

      await animalService.update(data);
      json.animal = await animalService.readById(id);
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
      await animalService.delete(id);
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
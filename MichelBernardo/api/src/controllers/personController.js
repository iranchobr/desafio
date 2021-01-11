const Person = require('../models/Person');

module.exports = {
  async index(req, res) {
    let results = await Person.findAll();
    const people = results.rows;

    if (people == 0) {
      return res.status(406).json({ error: true, message: 'empty table' });
    } else {
      return res.json(people);
    }
  },

  async find(req, res) {
    const personId = req.params.id;
    const person = await Person.findOne(personId);

    if (person == 0) {
      return res.status(406).json({ error: true, message: 'empty' });
    } else {
      return res.json(person);
    }
  },

  async post(req, res) {
    const data = req.body;
    await Person.createPerson(data);
    return res.status(201).json(data);
  },

  async put(req, res) {
    const personId = req.params.id;
    const person = await Person.findOne(personId);
    const data = req.body;

    if (!person) {
      return res.status(404).json({ error: true, message: 'Not found' });
    } else {
      await Person.updatePerson({
        id: personId,
        no_pessoa: data.no_pessoa,
        no_email: data.no_email,
        endereco: data.endereco,
        sexo: data.sexo,
        ic_ativo: data.ic_ativo,
      });
      return res.status(202).json({ error: false, message: 'updated!' });
    }
  },

  async delete(req, res) {
    const personId = req.params.id;
    const person = await Person.findOne(personId);

    if (!person) {
      return res.status(404).json({ error: true, message: 'Not found!' });
    } else {
      await Person.deletePerson(personId);
      return res
        .status(200)
        .json({ error: false, message: 'Register deleted!' });
    }
  },
};

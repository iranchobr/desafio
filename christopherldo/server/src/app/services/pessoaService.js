const {
  Sequelize
} = require('sequelize');
const {
  Pessoa
} = require('../models');

module.exports = {
  getPessoaByEmail: async email => {
    return await Pessoa.findOne({
      where: {
        no_email: email,
      },
    });
  },
  create: async pessoaObject => {
    return await Pessoa.create(pessoaObject);
  },
  readAll: async (options) => {
    return await Pessoa.findAll(options)
  },
  readById: async id => {
    return await Pessoa.findOne({
      where: {
        id,
      },
    });
  },
  update: async pessoaObject => {
    return await Pessoa.update(pessoaObject, {
      where: {
        id: pessoaObject.id,
      },
    });
  },
  toggleActivate: async id => {
    return await Pessoa.update({
      ic_ativo: Sequelize.literal('NOT ic_ativo')
    }, {
      where: {
        id,
      },
    });
  },
  delete: async id => {
    return await Pessoa.destroy({
      where: {
        id,
      },
    });
  },
};
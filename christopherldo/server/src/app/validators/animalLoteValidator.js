const {
  checkSchema,
  check
} = require('express-validator');

const {
  animalLoteService,
  animalXLoteService
} = require('../services');

module.exports = {
  create: checkSchema({
    no_lote: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
      },
      errorMessage: 'O nome do lote precisa conter pelo menos 2 caracteres',
    },
    ds_lote: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
      },
      errorMessage: 'A descrição do lote precisa conter pelo menos 2 caracteres',
    },
  }),
  readById: checkSchema({
    id: {
      notEmpty: true,
      isInt: true,
      toInt: true,
      errorMessage: 'O id precisa ser um número inteiro',
      custom: {
        options: async value => {
          try {
            if (await animalLoteService.readById(value) === null) {
              throw new Error('Lote não encontrado');
            };
          } catch (error) {
            throw new Error(error.message);
          };

          return true;
        },
      },
    },
  }),
  update: checkSchema({
    id: {
      notEmpty: true,
      isInt: true,
      toInt: true,
      errorMessage: 'O id precisa ser um número inteiro',
      custom: {
        options: async value => {
          try {
            if (await animalLoteService.readById(value) === null) {
              throw new Error('Lote não encontrado');
            };
          } catch (error) {
            throw new Error(error.message);
          };

          return true;
        },
      },
    },
    no_lote: {
      optional: true,
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
      },
      errorMessage: 'O nome do lote precisa conter pelo menos 2 caracteres',
    },
    ds_lote: {
      optional: true,
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
      },
      errorMessage: 'A descrição do lote precisa conter pelo menos 2 caracteres',
    },
  }),
  delete: checkSchema({
    id: {
      notEmpty: true,
      isInt: true,
      toInt: true,
      errorMessage: 'O id precisa ser um número inteiro',
      custom: {
        options: async value => {
          try {
            if (await animalLoteService.readById(value) === null) {
              throw new Error('Lote não encontrado');
            };
            const alocacoesArray = await animalXLoteService.readAll({where: {fk_id_lote: value}});
            if (alocacoesArray.length > 0) {
              throw new Error('Essa lote não pode ser deletado porque está associado a alocações');
            };
          } catch (error) {
            throw new Error(error.message);
          };

          return true;
        },
      },
    },
  }),
};
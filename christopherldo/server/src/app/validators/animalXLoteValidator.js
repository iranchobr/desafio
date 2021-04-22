const {
  checkSchema,
  check
} = require('express-validator');

const {
  animalService,
  animalLoteService,
  animalXLoteService,
} = require('../services');

module.exports = {
  create: checkSchema({
    fk_id_animal: {
      notEmpty: true,
      isInt: true,
      toInt: true,
      errorMessage: 'O id precisa ser um número inteiro',
      custom: {
        options: async value => {
          try {
            if (await animalService.readById(value) === null) {
              throw new Error('Animal não encontrado');
            };
          } catch (error) {
            throw new Error(error.message);
          };

          return true;
        },
      },
    },
    fk_id_lote: {
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
    dt_entrada: {
      notEmpty: true,
      isDate: true,
      errorMessage: 'A data de entrada precisa ser preenchida e precisa estar em um formato válido',
    },
    dt_saida: {
      notEmpty: true,
      isDate: true,
      errorMessage: 'A data de saída precisa ser preenchida e precisa estar em um formato válido',
      custom: {
        options: (value, {req}) => {
          if(new Date(value) < new Date(req.body.dt_entrada)){
            throw new Error('A data de entrada não pode ser maior que a data de saída');
          };

          return true;
        },
      },
    },
    ic_bezerro: {
      isBoolean: true,
      toBoolean: true,
      errorMessage: "O campo ic_bezerro precisa conter valor verdadeiro ou falso",
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
            if (await animalXLoteService.readById(value) === null) {
              throw new Error('Relação não encontrada');
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
            if (await animalXLoteService.readById(value) === null) {
              throw new Error('Relação não encontrada');
            };
          } catch (error) {
            throw new Error(error.message);
          };

          return true;
        },
      },
    },
    dt_entrada: {
      optional: true,
      isDate: true,
      errorMessage: 'A data de entrada precisa ser preenchida e precisa estar em um formato válido',
      custom: {
        options: (value, {req}) => {
          if(req.body.dt_saida === undefined) {
            throw new Error('O campo dt_saida torna-se obrigatório ao envio de dt_entrada');
          };

          return true;
        },
      },
    },
    dt_saida: {
      optional: true,
      notEmpty: true,
      isDate: true,
      errorMessage: 'A data de saída precisa ser preenchida e precisa estar em um formato válido',
      custom: {
        options: (value, {req}) => {
          if(req.body.dt_entrada === undefined) {
            throw new Error('O campo dt_entrada torna-se obrigatório ao envio de dt_saida');
          };

          if(new Date(value) < new Date(req.body.dt_entrada)){
            throw new Error('A data de entrada não pode ser maior que a data de saída');
          };

          return true;
        },
      },
    },
    ic_bezerro: {
      optional: true,
      isBoolean: true,
      toBoolean: true,
      errorMessage: "O campo ic_bezerro precisa conter valor verdadeiro ou falso",
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
            if (await animalXLoteService.readById(value) === null) {
              throw new Error('Relação não encontrada');
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
const {
  checkSchema, check
} = require('express-validator');

const {
  pessoaService,
  animalService
} = require('../services');

module.exports = {
  create: checkSchema({
    fk_id_pessoa: {
      notEmpty: true,
      isInt: true,
      toInt: true,
      errorMessage: 'O id da pessoa precisa ser um número inteiro',
      custom: {
        options: async value => {
          try {
            if (await pessoaService.readById(value) === null) {
              throw new Error('Pessoa não encontrada');
            };
          } catch (error) {
            throw new Error(error.message);
          };

          return true;
        },
      },
    },
    no_animal: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
      },
      errorMessage: 'O nome do animal precisa conter pelo menos 2 caracteres',
    },
    no_raca: {
      notEmpty: true,
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
      },
      errorMessage: 'O nome da raça precisa conter pelo menos 2 caracteres',
    },
    sexo: {
      notEmpty: true,
      errorMessage: 'O sexo precisa ser preenchido',
      custom: {
        options: async value => {
          if (value) {
            const acceptedValues = ['M', 'F'];

            if (acceptedValues.includes(value) === false) {
              throw new Error('O valor do sexo precisa ser M ou F');
            };

            return true;
          };
        },
      },
    },
    vr_peso: {
      notEmpty: true,
      isDecimal: true,
      toFloat: true,
      errorMessage: 'O peso do animal precisa ser um número decimal',
    },
    dt_nascimento: {
      notEmpty: true,
      isDate: true,
      errorMessage: 'A data precisa ser preenchida e precisa estar em um formato válido',
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
    fk_id_pessoa: {
      optional: true,
      isInt: true,
      toInt: true,
      errorMessage: 'O id da pessoa precisa ser um número inteiro',
      custom: {
        options: async value => {
          try {
            if (await pessoaService.readById(value) === null) {
              throw new Error('Pessoa não encontrada');
            };
          } catch (error) {
            throw new Error(error.message);
          };

          return true;
        },
      },
    },
    no_animal: {
      optional: true,
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
      },
      errorMessage: 'O nome do animal precisa conter pelo menos 2 caracteres',
    },
    no_raca: {
      optional: true,
      trim: true,
      isLength: {
        options: {
          min: 2,
        },
      },
      errorMessage: 'O nome da raça precisa conter pelo menos 2 caracteres',
    },
    sexo: {
      optional: true,
      notEmpty: true,
      custom: {
        options: async value => {
          if (value) {
            const acceptedValues = ['M', 'F'];

            if (acceptedValues.includes(value) === false) {
              throw new Error('O valor do sexo precisa ser M ou F');
            };

            return true;
          };
        },
      },
    },
    vr_peso: {
      optional: true,
      isDecimal: true,
      toFloat: true,
      errorMessage: 'O peso do animal precisa ser um número decimal',
    },
    dt_nascimento: {
      optional: true,
      isDate: true,
      errorMessage: 'A data de nascimento precisa ser preenchida e precisa estar em um formato válido',
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
  }),
};
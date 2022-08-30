'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('pessoa', [
      {
        no_pessoa: 'Matheus Prado',
        no_email: 'matheusp@gmail.com',
        endereco: 'Rua X, Goiania - GO',
        sexo: 'M',
        ic_ativo: true
      },
      {
        no_pessoa: 'João da Silva Sauro',
        no_email: 'joao@outlook.com',
        endereco: 'Av Y, Goiania - GO',
        sexo: 'M',
        ic_ativo: true
      },
      {
        no_pessoa: 'Felizberta Matos',
        no_email: 'felizbm@hotmail.com',
        endereco: 'Alameda Z, Goiania - GO',
        sexo: 'F',
        ic_ativo: false
      },
      {
        no_pessoa: 'Maria Souza',
        no_email: 'marias@yahoo.com',
        endereco: 'Rua 42, Goiania - GO',
        sexo: 'F',
        ic_ativo: false
      },
    ]);
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('pessoa', null, {});
  }
};
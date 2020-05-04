# Desafio_IRancho
## Intuções de Como subir esse o Projeto.

## Passo 1: Conecte a aplicação em um banco de dados MySQL
  Em server/config/conection, em const sequelize, onde ta escrito "farmer", coloque um nome de um 
 banco de dados que você tenha em seu MySQL, depois Você insere o seu nome do usuário e sua senha
 
const Sequelize = require("sequelize");

const sequelize = new Sequelize("banco", "usuário", "senha", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão realizada com sucesso.");
  })
  .catch((err) => {
    console.log("Erro ao realizar a conexão ao banco de dados!");
  });

module.exports = sequelize;

## Passo 2: Crie as tabelas

 Em server/models, terá 4 arquivos que utilizam o sequelize para criar as tabelas no baco. no final de
cada arquivo terá //Pessoa.sync({ force: true }); comentado. Descomente.

## Passo 3: Suba a aplicação
  No terminal, na pasta server, digite o comando node app.js para subir o servidor.Abra outra janela 
no terminal, e acesse o diretótio client, digite o camando npm run dev e seu projeto estará subindo.

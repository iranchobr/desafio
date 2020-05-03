const Sequelize = require("sequelize");

const sequelize = new Sequelize("farmer", "fernando", "395395", {
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

module.exports = {
  username: "root",
  password: "password",
  database: "desafio",
  host: "127.0.0.1",
  dialect: "mysql",
  define: {
    timestamps: true, //created at - upadate at(colunas bd)
    underscored: true, // padrao de nomeclatura de tabelas
    underscoredAll: true,
  },
};

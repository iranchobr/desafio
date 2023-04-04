const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const routes = require("./src/routes/index.js");
const Sequelize = require("sequelize");
const config = require("./src/config/config.js")[
  process.env.NODE_ENV || "development"
];

const corsOptions = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

console.log(config);

const sequelize = new Sequelize(config);

const Pessoa = require("./src/models/Pessoa");
const Animal = require("./src/models/Animal");
const Lote = require("./src/models/Lote");
const AnimalLote = require("./src/models/AnimalLote");

Pessoa.init(sequelize);
Animal.init(sequelize);
Lote.init(sequelize);
AnimalLote.init(sequelize);

Pessoa.associate(sequelize.models);
Animal.associate(sequelize.models);
Lote.associate(sequelize.models);
AnimalLote.associate(sequelize.models);

sequelize.sync();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;

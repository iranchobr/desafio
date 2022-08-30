const Sequelize = require('sequelize');
const config = require('../config/database');

/* Import Models */
const Pessoas = require('../src/models/Pessoas');
const Animais = require('../src/models/Animais');
const Lotes = require('../src/models/Lotes');
const AnimaisLote = require('../src/models/AnimaisLote');

/*Criando a conexão */
const connection = new Sequelize(config);

Pessoas.init(connection);
Animais.init(connection);
Lotes.init(connection);
AnimaisLote.init(connection);

Pessoas.associate(connection.models);
Animais.associate(connection.models);
Lotes.associate(connection.models);

module.exports = connection;
const Sequelize = require('sequelize');
const config = require('../config/database');

/* Import Models */
const Pessoas = require('../models/Pessoas');
const Animais = require('../models/Animais');
const Lotes = require('../models/Lotes');
const AnimaisLote = require('../models/AnimaisLote');

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
const express = require('express');
const cors = require('cors');
const app = express();

// Rotas
const index = require('./routes/index');
const rotaPessoas = require('./routes/rotaPessoas');
const rotaAnimais = require('./routes/rotaAnimais');
const rotaAnimaisLotes = require('./routes/rotaAnimaisLotes');
const rotaLotes = require('./routes/rotaLotes');

app.use(cors());
app.use(express.json());
app.use('/', index);
app.use('/pessoas', rotaPessoas);
app.use('/animais', rotaAnimais);
app.use('/animais_lotes', rotaAnimaisLotes);
app.use('/lotes', rotaLotes);

module.exports = app;

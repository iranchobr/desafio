const express = require('express');
const pessoas = require('./pessoaRoute');
const animais = require('./animalRoute');
const lotes = require('./loteRoute');
const animaisLote = require('./animalLoteRoute');

module.exports = app => {
    app.use(express.json());

    app.use(pessoas);
    app.use(animais);
    app.use(lotes);
    app.use(animaisLote);
}
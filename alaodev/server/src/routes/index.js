const express = require('express');
const pessoas = require('./pessoasRoute');
const animais = require('./animaisRoute');
const lotes = require('./lotesRoute');
const animaisLotes = require('./animaisLotes');

module.exports = app => {
    app.use(express.json());

    app.use(pessoas);
    app.use(animais);
    app.use(lotes);
    app.use(animaisLotes);
}
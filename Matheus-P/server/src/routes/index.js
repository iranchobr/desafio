const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).send({
        title: "API Desafio iRancho",
        version: "1.0.0",
        description: "API de CRUD Animal/Pessoa do Desafio iRancho"
    });
});

module.exports = router;

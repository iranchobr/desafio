const express = require("express");
const router = express.Router();
const pessoa = require("./pessoa.js");
const animal = require("./animal.js");
const lote = require("./lote.js")
const animalLote = require("./animalLote.js");

router.use("/animalLote", animalLote)
router.use("/lote", lote)
router.use("/animal", animal);
router.use("/pessoa", pessoa);

module.exports = router;
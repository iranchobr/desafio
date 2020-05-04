const express = require("express");
const router = express.Router();
const pessoa = require("./pessoa");
const animal = require("./animal");
const lote = require("./lote");
const animalLote = require("./animalLote");

router.use("/pessoa", pessoa);
router.use("/animal", animal);
router.use("/lote", lote);
router.use("/animal_lote", animalLote);

module.exports = router;

const express = require("express");
const router = express.Router();

const animalLote = require("../controllers/animalLote.js");

router.post("/", animalLote.create);

router.get("/", animalLote.findAll);

router.get("/:id", animalLote.findOne);

router.put("/:id", animalLote.update);

router.delete("/:id", animalLote.delete);


module.exports = router;
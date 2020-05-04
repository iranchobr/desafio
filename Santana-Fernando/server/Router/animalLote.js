const express = require("express");
const router = express.Router();

const animalLote = require("../Services/animaiLotes");

router.get("/list", animalLote.listar);
router.post("/create", animalLote.criar);
router.put("/put/:id", animalLote.atualizar);
router.delete("/delete/:id", animalLote.deletar);

module.exports = router;

const express = require("express");
const router = express.Router();

const lote = require("../Services/lotes");

router.get("/list", lote.listar);
router.post("/create", lote.criar);
router.put("/put/:id", lote.atualizar);
router.delete("/delete/:id", lote.deletar);

module.exports = router;

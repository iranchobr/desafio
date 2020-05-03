const express = require("express");
const router = express.Router();

const animal = require("../Services/animais");

router.get("/list", animal.listar);
router.get("/query", animal.listaPessoa);
router.post("/create", animal.criar);
router.put("/put/:id", animal.atualizar);
router.delete("/delete/:id", animal.deletar);

module.exports = router;

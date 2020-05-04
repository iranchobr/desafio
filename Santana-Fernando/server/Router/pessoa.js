const express = require("express");
const router = express.Router();

const pessoa = require("../Services/pessoas");

router.get("/list", pessoa.listar);
router.post("/create", pessoa.criar);
router.put("/put/:id", pessoa.atualizar);
router.delete("/delete/:id", pessoa.deletar);

module.exports = router;

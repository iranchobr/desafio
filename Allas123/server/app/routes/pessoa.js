const express = require("express");
const router = express.Router();

const pessoa = require("../controllers/pessoa.js");

router.post("/", pessoa.create);

router.get("/", pessoa.findAll);

router.get("/:id", pessoa.findOne);

router.put("/:id", pessoa.update);

router.delete("/:id", pessoa.delete);


module.exports = router;
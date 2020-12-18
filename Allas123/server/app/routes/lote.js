const express = require("express");
const router = express.Router();

const lote = require("../controllers/lote.js");

router.post("/", lote.create);

router.get("/", lote.findAll);

router.get("/:id", lote.findOne);

router.put("/:id", lote.update);

router.delete("/:id", lote.delete);


module.exports = router;
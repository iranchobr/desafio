const express = require("express");
const router = express.Router();

const animal = require("../controllers/animal");

router.post("/", animal.create);

router.get("/", animal.findAll);

router.get("/:id", animal.findOne);

router.put("/:id", animal.update);

router.delete("/:id", animal.delete);

module.exports = router;
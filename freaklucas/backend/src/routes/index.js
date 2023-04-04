const express = require("express");
const router = express.Router();

const PessoaController = require("../controllers/PessoaController");
const AnimalController = require("../controllers/AnimalController");
const LoteController = require("../controllers/LoteController");
const AnimalLoteController = require("../controllers/AnimalLoteController");

router.get("/", (req, res) => {
  res.send("Hello!");
});

router.get("/pessoas", PessoaController.list);
router.get("/pessoas/:id", PessoaController.find);
router.post("/pessoas", PessoaController.create);
router.put("/pessoas/:id", PessoaController.update);
router.delete("/pessoas/:id", PessoaController.delete);
router.get("/animais/:id", PessoaController.showAnimals);

router.get("/animals", AnimalController.getAll);
router.get("/animals/:id", AnimalController.getOne);
router.post("/animals/:id_user", AnimalController.create);
router.put("/animals/:id", AnimalController.update);
router.delete("/animals/:id", AnimalController.delete);

router.get("/lotes", LoteController.list);
router.get("/lotes/:id", LoteController.find);
router.post("/lotes", LoteController.create);
router.put("/lotes/:id", LoteController.update);
router.delete("/lotes/:id", LoteController.delete);


router.get("/animal-lotes", AnimalLoteController.getAll);
router.get("/animal-lotes/:id", AnimalLoteController.getOne);
router.post("/animal-lotes", AnimalLoteController.create);
router.put("/animal-lotes/:id", AnimalLoteController.update);
router.delete("/animal-lotes/:id", AnimalLoteController.delete);
module.exports = router;

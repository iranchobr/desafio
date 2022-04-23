import { Router } from "express";
import getPessoasController from "../controllers/pessoas/getPessoas.controller";
import createPessoaController from "../controllers/pessoas/createPessoa.controller";
import updatePessoaController from "../controllers/pessoas/updatePessoa.controller";

const router = Router();

router.get("",getPessoasController);
router.post("",createPessoaController);
router.patch("/:id",updatePessoaController);

export default router;

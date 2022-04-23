import { Router } from "express";
import getPessoasController from "../controllers/pessoas/getPessoas.controller";
import createPessoaController from "../controllers/pessoas/createPessoa.controller";

const router = Router();

router.get("",getPessoasController);
router.post("",createPessoaController);

export default router;

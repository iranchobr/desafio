import { Router } from "express";
import getPessoasController from "../controllers/pessoas/getPessoas.controller";
import createPessoaController from "../controllers/pessoas/createPessoa.controller";
import updatePessoaController from "../controllers/pessoas/updatePessoa.controller";
import deletePessoaController from "../controllers/pessoas/deletePessoa.controller";

const router = Router();

router.get("",getPessoasController);
router.post("",createPessoaController);
router.patch("/:id",updatePessoaController);
router.delete("/:id",deletePessoaController);

export default router;

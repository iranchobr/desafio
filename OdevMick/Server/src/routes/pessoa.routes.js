import { Router } from "express";
import getPessoasController from "../controllers/getPessoas.controller";

const router = Router();

router.get("/pessoas",getPessoasController);
export default router;

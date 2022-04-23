import { Router } from 'express';
import getLotesController from '../controllers/lotes/getLotes.controller';


const router = Router();

router.get("",getLotesController);
// router.post("",createAnimalController);
// router.patch("/:id",updateAnimalController);
// router.delete("/:id",deleteAnimalController);

export default router;
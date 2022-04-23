import { Router } from 'express';

import getAnimaisController from '../controllers/animais/getAnimais.controller';
import createAnimalController from '../controllers/animais/createAnimal.controller';
import updateAnimalController from '../controllers/animais/updateAnimal.controller';

const router = Router();

router.get("",getAnimaisController);
router.post("",createAnimalController);
router.patch("/:id",updateAnimalController);

export default router;
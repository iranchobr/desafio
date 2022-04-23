import { Router } from 'express';

import getAnimaisController from '../controllers/animais/getAnimais.controller';
import createAnimalController from '../controllers/animais/createAnimal.controller';
import updateAnimalController from '../controllers/animais/updateAnimal.controller';
import deleteAnimalController from '../controllers/animais/deleteAnimal.controller';

const router = Router();

router.get("",getAnimaisController);
router.post("",createAnimalController);
router.patch("/:id",updateAnimalController);
router.delete("/:id",deleteAnimalController);

export default router;
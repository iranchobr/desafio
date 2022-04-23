import { Router } from 'express';

import getAnimaisController from '../controllers/animais/getAnimais.controller';
import createAnimalController from '../controllers/animais/createAnimal.controller';

const router = Router();

router.get("",getAnimaisController);
router.post("",createAnimalController);

export default router;
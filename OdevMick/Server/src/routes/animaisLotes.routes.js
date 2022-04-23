import { Router } from 'express';

import getAnimaisLotesController from '../controllers/animaisLotes/getAnimaisLotes.controller';
import createAnimalLoteController from '../controllers/animaisLotes/createAnimalLote.controller';
import updateAnimalLoteController from '../controllers/animaisLotes/updateAnimalLote.controller';
import deleteAnimalLoteController from '../controllers/animaisLotes/deleteAnimalLote.controller';

const router = Router();

router.get("",getAnimaisLotesController);
router.post("",createAnimalLoteController);
router.patch("/:id",updateAnimalLoteController);
router.delete("/:id",deleteAnimalLoteController);

export default router;
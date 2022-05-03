import { Router } from 'express';

import getLotesController from '../controllers/lotes/getLotes.controller';
import createLoteController from '../controllers/lotes/createLote.controller';
import updateLoteController from '../controllers/lotes/updateLote.controller';
import deleteLoteController from '../controllers/lotes/deleteLote.controller';

const router = Router();

router.get("",getLotesController);
router.post("",createLoteController);
router.patch("/:id",updateLoteController);
router.delete("/:id",deleteLoteController);

export default router;
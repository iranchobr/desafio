import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { BatchController } from '../controllers/BatchController';

const batchController = new BatchController();

const batchRoutes = Router();

batchRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  batchController.create,
);

batchRoutes.get('/', batchController.show);

batchRoutes.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  batchController.update,
);

export default batchRoutes;

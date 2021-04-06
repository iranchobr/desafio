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

export default batchRoutes;

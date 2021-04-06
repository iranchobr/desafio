import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { AnimalBatchController } from '../controllers/AnimalBatchController';

const animalBatchController = new AnimalBatchController();

const animalBatchRoutes = Router();

animalBatchRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id_batch: Joi.string().required().uuid(),
      id_animal: Joi.string().required().uuid(),
      dt_entry: Joi.date().required().max(new Date()),
      dt_exit: Joi.date().required().max(new Date()),
      calf: Joi.boolean().required(),
    },
  }),
  animalBatchController.create,
);

animalBatchRoutes.get('/', animalBatchController.show);

export default animalBatchRoutes;

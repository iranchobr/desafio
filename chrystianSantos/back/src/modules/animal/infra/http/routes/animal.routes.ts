import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { AnimalController } from '../controllers/AnimalController';

const animalController = new AnimalController();

const animalRoutes = Router();

animalRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      id_people: Joi.string().required(),
      breed: Joi.string().required(),
      sex: Joi.string().required(),
      weigth: Joi.number().required().min(0),
      born: Joi.date().max(new Date()),
    },
  }),
  animalController.create,
);

export default animalRoutes;

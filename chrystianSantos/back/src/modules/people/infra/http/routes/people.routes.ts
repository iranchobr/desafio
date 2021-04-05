import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { PeopleController } from '../controllers/PeopleController';

const peopleController = new PeopleController();

const peopleRoutes = Router();

peopleRoutes.use(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      active: Joi.boolean().required(),
      email: Joi.string().email().required(),
      endereco: Joi.string().required(),
      sex: Joi.string().required(),
    },
  }),
  peopleController.create,
);

export default peopleRoutes;

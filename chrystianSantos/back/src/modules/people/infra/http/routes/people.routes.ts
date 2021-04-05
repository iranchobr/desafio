import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { PeopleController } from '../controllers/PeopleController';

const peopleController = new PeopleController();

const peopleRoutes = Router();

peopleRoutes.post(
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

peopleRoutes.get('/', peopleController.show);
peopleRoutes.put('/:id', peopleController.update);
peopleRoutes.delete('/:id', peopleController.delete);

export default peopleRoutes;

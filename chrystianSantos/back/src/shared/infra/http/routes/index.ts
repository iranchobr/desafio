import { Router } from 'express';
import peopleRoutes from '@modules/people/infra/http/routes/people.routes';
import animalRoutes from '@modules/animal/infra/http/routes/animal.routes';

const routes = Router();

routes.use('/people', peopleRoutes);
routes.use('/animal', animalRoutes);
export default routes;

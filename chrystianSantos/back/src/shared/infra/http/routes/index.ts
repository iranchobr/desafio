import { Router } from 'express';
import peopleRoutes from '@modules/people/infra/http/routes/people.routes';
import animalRoutes from '@modules/animal/infra/http/routes/animal.routes';
import batchRoutes from '@modules/batch/infra/http/routes/batch.routes';

const routes = Router();

routes.use('/people', peopleRoutes);
routes.use('/animal', animalRoutes);
routes.use('/batch', batchRoutes);
export default routes;

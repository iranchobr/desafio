import { Router } from 'express';
import peopleRoutes from '@modules/people/infra/http/routes/People.routes';

const routes = Router();

routes.use('/people', peopleRoutes);
export default routes;

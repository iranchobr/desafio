import { Router } from 'express';
import {PeopleController} from '../controllers/PeopleController';

const peopleController = new PeopleController();

const peopleRoutes = Router();

peopleRoutes.use('/', peopleController.create);


export default peopleRoutes;

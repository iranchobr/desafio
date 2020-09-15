import { Router } from 'express';

import PessoaController from './app/controllers/PessoaController';
import AnimalController from './app/controllers/AnimalController';

const routes = new Router();

// rotas /pessoas
routes.post('/pessoas', PessoaController.criar);
routes.get('/pessoas', PessoaController.listarTodos);
routes.put('/pessoas/:id', PessoaController.atualizar);
routes.get('/pessoas/:id', PessoaController.detalhePessoa);
routes.delete('/pessoas/:id', PessoaController.deletar);

// rotas /animais
routes.post('/animais', AnimalController.criar);
routes.get('/animais', AnimalController.listarTodos);
routes.put('/animais/:id', AnimalController.atualizar);
routes.get('/animais/:id', AnimalController.detalheAnimal);
routes.delete('/animais/:id', AnimalController.deletar);

export default routes;

import { Router } from 'express';

import PessoaController from './app/controllers/PessoaController';
import AnimalController from './app/controllers/AnimalController';
import LoteController from './app/controllers/LoteController';
import AnimalLoteController from './app/controllers/AnimalLoteController';

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

// rotas /lotes
routes.post('/lotes', LoteController.criar);
routes.get('/lotes', LoteController.listarTodos);
routes.put('/lotes/:id', LoteController.atualizar);
routes.get('/lotes/:id', LoteController.detalheLote);
routes.delete('/lotes/:id', LoteController.deletar);

// rotas /animallote
routes.post('/animallote', AnimalLoteController.criar);
routes.get('/animallote', AnimalLoteController.listarTodos);
routes.put('/animallote/:id', AnimalLoteController.atualizar);
routes.get('/animallote/:id', AnimalLoteController.detalheRegistro);
routes.delete('/animallote/:id', AnimalLoteController.deletar);

export default routes;

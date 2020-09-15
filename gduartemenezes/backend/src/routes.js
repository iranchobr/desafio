import { Router } from 'express';

import PessoaController from './app/controllers/PessoaController';

const routes = new Router();

routes.post('/pessoas', PessoaController.criar);
routes.get('/pessoas', PessoaController.listarTodos);
routes.put('/pessoas/:id', PessoaController.atualizar);
routes.get('/pessoas/:id', PessoaController.detalhePessoa);
routes.delete('/pessoas/:id', PessoaController.deletar);

export default routes;

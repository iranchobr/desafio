const { Router } = require('express');
const PessoasController = require('../controllers/PessoasControllers');

const router = Router();

router.get('/pessoas', PessoasController.getPessoas);
router.get('/pessoas/:id', PessoasController.getPessoaById);
router.post('/pessoas', PessoasController.setPessoa);
router.patch('/pessoas/:id', PessoasController.updatePessoa);
router.delete('/pessoas/:id', PessoasController.deletePessoa);

module.exports = router;
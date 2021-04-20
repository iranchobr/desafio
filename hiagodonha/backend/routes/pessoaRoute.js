const { Router } = require('express');
const PessoasRest = require('../rest/pessoaRest');

const router = Router();

router.get('/pessoas', PessoasRest.getPessoas);
router.get('/pessoas/:id', PessoasRest.getPessoaById);
router.post('/pessoas', PessoasRest.setPessoa);
router.patch('/pessoas/:id', PessoasRest.updatePessoa);
router.delete('/pessoas/:id', PessoasRest.deletePessoa);

module.exports = router;
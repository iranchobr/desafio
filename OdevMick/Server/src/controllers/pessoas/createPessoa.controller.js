import createPessoaService from "../../services/pessoas/createPessoa.service";

const createPessoaController = ( req, res ) => {
    const reqBody = req.body;
    createPessoaService(reqBody)
    .then( result => {
        return res.status(201).json(result);
    })
    .catch( err => {
        return res.status(err.status).json({"error": err.message});
    });
};
export default createPessoaController;
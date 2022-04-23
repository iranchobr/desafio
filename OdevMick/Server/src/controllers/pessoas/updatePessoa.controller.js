import updatePessoaService from "../../services/pessoas/updatePessoa.service";

const updatePessoaController = ( req, res ) => {
    const { id } = req.params;
    const reqBody = req.body;
    updatePessoaService(reqBody,id)
    .then( result => {
      if(!result)
        return res.status(404).json({"msg":"Pessoa not found!"});
      
      return res.json(result);
    })
    .catch( err => {
      return res.status(err.status).json({"error": err.message});
    });
};
export default updatePessoaController;

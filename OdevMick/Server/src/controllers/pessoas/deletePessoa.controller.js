import deletePessoaService from "../../services/pessoas/deletePessoa.service";

const deletePessoaController = ( req, res) => {
    const { id } = req.params;
    deletePessoaService(id)
    .then( result => {
        return res.status(result.status).json({"msg":result.message})
    })
    .catch( err => {
        return res.status(500).json({"error":err.message})
    })
};
export default deletePessoaController;
import getPessoasService from '../../services/pessoas/getPessoas.service';

const getPessoasController = ( req, res ) =>{
    getPessoasService()
    .then( pessoas_list => {
        return res.json(pessoas_list);
    })
    .catch( _ => {
        return res.json({"msg":"Something went wrong"});
    });
};
export default getPessoasController;

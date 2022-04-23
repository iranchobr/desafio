import { Pessoa } from '../../app/models/pessoa';
import { CustomSequelizeError } from '../../errors/customErrors';
const createPessoaService = async (reqBody) => {
    try{
        const pessoa = await Pessoa.create(reqBody);
        return pessoa;
    }catch(err){
        return CustomSequelizeError.handleErrors(err,'Pessoa');
    };
};
export default createPessoaService;

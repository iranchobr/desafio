import { Pessoa } from '../../app/models/pessoa';
import { CustomSequelizeError } from '../../errors/customErrors';
const updatePessoaService = async (reqBody,id) => {
  try{
    await Pessoa.update(reqBody,{where:{id:id}});
    const pessoa = Pessoa.findByPk(id);
    return pessoa;
  }catch(err){
    return CustomSequelizeError.handleErrors(err,"Pessoa");
  }
};
export default updatePessoaService;

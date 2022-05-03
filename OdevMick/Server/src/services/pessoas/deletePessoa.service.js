import { Pessoa } from '../../app/models/pessoa';
import { deleteInstanceInDb } from '../index';
const deletePessoaService = async (id) => {
    try{    
        return deleteInstanceInDb(id,Pessoa);
    }catch(err){
        throw new Error("Something went wrong");
    }
};
export default deletePessoaService;
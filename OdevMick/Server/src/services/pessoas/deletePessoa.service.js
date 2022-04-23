import { Pessoa } from '../../app/models/pessoa';
const deletePessoaService = async (id) => {
    try{    
        return findPessoaInDb(id);
    }catch(err){
        throw new Error("Something went wrong");
    }
};
const findPessoaInDb = async (id) => { 
    const result = await Pessoa.destroy({where:{id:id}});
    if(result){
        return res("Pessoa deleted successfully!",200);
    }
    return res("Pessoa not found!",404);
};

const res = (message,status) => {
    return {"message": message, "status": status};
};

export default deletePessoaService;
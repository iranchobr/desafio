import { Pessoa } from '../../app/models/pessoa';
import { CustomSequelizeError } from '../../errors/customErrors';
const createPessoaService = async (reqBody) => {
    try{
        const pessoa = await Pessoa.create(reqBody);
        return pessoa.dataValues
    }catch(err){
        return await handleErrors(err);
    };
};

const handleErrors = async (err) =>{
    const errors = ['SequelizeUniqueConstraintError','SequelizeValidationError'];
        const messages = [
            {"message":"email or name must be unique","status":409},
            {"message":"email and name are required","status":400}
        ];
        errors.forEach((error,index)=>{
            if(err.name===error){
                throw new CustomSequelizeError(messages[index].message,messages[index].status)
            }
        })
}
export default createPessoaService;
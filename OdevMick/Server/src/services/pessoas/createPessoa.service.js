import { Pessoa } from '../../app/models/pessoa';
import { Sequelize } from 'sequelize';
import { CustomValidationError } from '../../errors/customErrors';
const createPessoaService = async (reqBody) => {
    try{
        const pessoa = await Pessoa.create(reqBody);
        return pessoa.dataValues
    }catch(err){
        if(err instanceof Sequelize.UniqueConstraintError){
            console.log(err)
            throw new CustomValidationError('Email or Name already exists!',409)
        }
        else if(err instanceof Sequelize.ValidationError) {
            throw new CustomValidationError('Email and Name are required!',404)
        }else{
        }
    };
};
export default createPessoaService;
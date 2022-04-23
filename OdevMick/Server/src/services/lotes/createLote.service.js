import { Lote } from '../../app/models/lote';
import { CustomSequelizeError } from '../../errors/customErrors';
const createLoteService = async (reqBody) => {
    try{
        const lote = await Lote.create(reqBody);
        return lote;
    }catch(err){
        return CustomSequelizeError.handleErrors(err,'Lote');
    };
};
export default createLoteService;

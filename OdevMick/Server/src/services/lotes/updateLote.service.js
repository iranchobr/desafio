import { CustomSequelizeError } from '../../errors/customErrors';
import { Lote } from '../../app/models/lote';
const updateLoteService = async (reqBody,id) => {
  try{
    await Lote.update(reqBody,{where:{id:id}});
    const lote = Lote.findByPk(id);
    return lote;
  }catch(err){
    return CustomSequelizeError.handleErrors(err,'Lote');
  }
};
export default updateLoteService;

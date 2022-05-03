import { CustomSequelizeError } from '../../errors/customErrors';
import { AnimalLote } from '../../app/models/animal_lote';
const updateAnimalLoteService = async (reqBody,id) => {
  try{
    await AnimalLote.update(reqBody,{where:{id:id}});
    const animalLote = AnimalLote.findByPk(id);
    return animalLote;
  }catch(err){
    return CustomSequelizeError.handleErrors(err,'AnimalLote');
  }
};
export default updateAnimalLoteService;

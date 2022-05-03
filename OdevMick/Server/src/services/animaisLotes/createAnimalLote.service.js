import { AnimalLote } from '../../app/models/animal_lote';
import { CustomSequelizeError } from '../../errors/customErrors';
const createAnimalLoteService = async (reqBody) => {
    try{
        const animalLote = await AnimalLote.create(reqBody);
        return animalLote;
    }catch(err){
        return CustomSequelizeError.handleErrors(err,'AnimalLote');
    };
};
export default createAnimalLoteService;

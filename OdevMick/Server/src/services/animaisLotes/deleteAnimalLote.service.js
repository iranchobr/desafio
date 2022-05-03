import { AnimalLote } from '../../app/models/animal_lote';
import { deleteInstanceInDb } from '../index';
const deleteAnimalLoteService = async (id) => {
    try{    
        return deleteInstanceInDb(id,AnimalLote);
    }catch(err){
        throw new Error("Something went wrong");
    }
};
export default deleteAnimalLoteService;
import { Animal } from '../../app/models/animal';
import { deleteInstanceInDb } from '../index';
const deleteAnimalService = async (id) => {
    try{    
        return deleteInstanceInDb(id,Animal);
    }catch(err){
        throw new Error("Something went wrong");
    }
};
export default deleteAnimalService;
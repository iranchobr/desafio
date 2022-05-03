import { Animal } from '../../app/models/animal';
import { CustomSequelizeError } from '../../errors/customErrors';
const createAnimalService = async (reqBody) => {
    try{
        const animal = await Animal.create(reqBody);
        return animal;
    }catch(err){
        return CustomSequelizeError.handleErrors(err,'Animal');
    };
};
export default createAnimalService;

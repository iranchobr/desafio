import { CustomSequelizeError } from '../../errors/customErrors';
import { Animal } from '../../app/models/animal';
const updateAnimalService = async (reqBody,id) => {
  try{
    await Animal.update(reqBody,{where:{id:id}});
    const animal = Animal.findByPk(id);
    return animal;
  }catch(err){
    return CustomSequelizeError.handleErrors(err,'Animal');
  }
};
export default updateAnimalService;

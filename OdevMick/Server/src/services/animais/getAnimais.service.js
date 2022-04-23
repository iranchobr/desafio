import { Animal } from '../../app/models/animal';

const getAnimaisService = async() => {
 const animais  = await Animal.findAll();
 return animais;
};
export default getAnimaisService;

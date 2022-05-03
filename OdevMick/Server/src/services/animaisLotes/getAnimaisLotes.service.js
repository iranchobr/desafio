import { AnimalLote } from '../../app/models/animal_lote';

const getAnimaisLotesService = async() => {
 const animaisLotes = await AnimalLote.findAll();
 return animaisLotes;
};
export default getAnimaisLotesService;

import { Lote } from '../../app/models/lote';

const getLotesService = async() => {
 const lotes  = await Lote.findAll();
 return lotes;
};
export default getLotesService;

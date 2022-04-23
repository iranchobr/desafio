import { Lote } from '../../app/models/lote';
import { deleteInstanceInDb } from '../index';
const deleteLoteService = async (id) => {
    try{    
        return deleteInstanceInDb(id,Lote);
    }catch(err){
        throw new Error("Something went wrong");
    }
};
export default deleteLoteService;
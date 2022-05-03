import getAnimaisLotesService from '../../services/animaisLotes/getAnimaisLotes.service';

const getAnimaisLotesController = ( req, res ) =>{
    getAnimaisLotesService()
    .then( animaisLotes_list => {
        return res.json(animaisLotes_list);
    })
    .catch( _ => {
        return res.status(500).json({"msg":"Something went wrong"});
    });
};
export default getAnimaisLotesController;
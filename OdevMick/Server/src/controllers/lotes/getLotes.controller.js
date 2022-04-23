import getLotesService from '../../services/lotes/getLotes.service';

const getLotesController = ( req, res ) =>{
    getLotesService()
    .then( lotes_list => {
        return res.json(lotes_list);
    })
    .catch( _ => {
        return res.status(500).json({"msg":"Something went wrong"});
    });
};
export default getLotesController;
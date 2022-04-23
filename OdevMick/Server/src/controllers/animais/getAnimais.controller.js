import getAnimaisService from '../../services/animais/getAnimais.service';

const getAnimaisController = ( req, res ) =>{
    getAnimaisService()
    .then( animais_list => {
        return res.json(animais_list);
    })
    .catch( _ => {
        return res.status(500).json({"msg":"Something went wrong"});
    });
};
export default getAnimaisController;
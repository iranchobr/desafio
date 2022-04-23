import updateLoteService from "../../services/lotes/updateLote.service";

const updateLoteController = ( req, res ) => {
    const { id } = req.params;
    const reqBody = req.body;
    updateLoteService(reqBody,id)
    .then( result => {
      if(!result)
        return res.status(404).json({"msg":"Lote not found!"});
      return res.json(result);
    })
    .catch( err => {
      return res.status(err.status).json({"error": err.message});
    });
};
export default updateLoteController;

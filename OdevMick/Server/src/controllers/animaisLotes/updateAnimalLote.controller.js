import updateAnimalLoteService from "../../services/animaisLotes/updateAnimalLote.service";

const updateAnimalLoteController = ( req, res ) => {
    const { id } = req.params;
    const reqBody = req.body;
    updateAnimalLoteService(reqBody,id)
    .then( result => {
      if(!result)
        return res.status(404).json({"msg":"AnimalLote not found!"});
      return res.json(result);
    })
    .catch( err => {
      return res.status(err.status).json({"error": err.message});
    });
};
export default updateAnimalLoteController;

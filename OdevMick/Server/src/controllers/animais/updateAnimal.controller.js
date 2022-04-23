import updateAnimalService from "../../services/animais/updateAnimal.service";

const updateAnimalController = ( req, res ) => {
    const { id } = req.params;
    const reqBody = req.body;
    updateAnimalService(reqBody,id)
    .then( result => {
      if(!result)
        return res.status(404).json({"msg":"Animal not found!"});
      return res.json(result);
    })
    .catch( err => {
      return res.status(err.status).json({"error": err.message});
    });
};
export default updateAnimalController;

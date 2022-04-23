import deleteAnimalLoteService from "../../services/animaisLotes/deleteAnimalLote.service";

const deleteAnimalLoteController = ( req, res) => {
    const { id } = req.params;
    deleteAnimalLoteService(id)
    .then( result => {
        return res.status(result.status).json({"msg":result.message})
    })
    .catch( err => {
        return res.status(500).json({"error":err.message})
    })
};
export default deleteAnimalLoteController;
import deleteAnimalService from "../../services/animais/deleteAnimal.service";

const deleteAnimalController = ( req, res) => {
    const { id } = req.params;
    deleteAnimalService(id)
    .then( result => {
        return res.status(result.status).json({"msg":result.message})
    })
    .catch( err => {
        return res.status(500).json({"error":err.message})
    })
};
export default deleteAnimalController;
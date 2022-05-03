import createAnimalService from "../../services/animais/createAnimal.service";

const createAnimalController = ( req, res ) => {
    const reqBody = req.body;
    createAnimalService(reqBody)
    .then( result => {
        return res.status(201).json(result);
    })
    .catch( err => {
        return res.status(err.status).json({"error": err.message});
    });
};
export default createAnimalController;
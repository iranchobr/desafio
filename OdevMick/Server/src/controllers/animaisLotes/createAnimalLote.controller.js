import createAnimalLoteService from "../../services/animaisLotes/createAnimalLote.service";

const createAnimalLoteController = ( req, res ) => {
    const reqBody = req.body;
    createAnimalLoteService(reqBody)
    .then( result => {
        return res.status(201).json(result);
    })
    .catch( err => {
        return res.status(err.status).json({"error": err.message});
    });
};
export default createAnimalLoteController;
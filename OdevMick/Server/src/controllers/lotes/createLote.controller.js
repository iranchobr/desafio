import createLoteService from "../../services/lotes/createLote.service";

const createLoteController = ( req, res ) => {
    const reqBody = req.body;
    createLoteService(reqBody)
    .then( result => {
        return res.status(201).json(result);
    })
    .catch( err => {
        return res.status(err.status).json({"error": err.message});
    });
};
export default createLoteController;
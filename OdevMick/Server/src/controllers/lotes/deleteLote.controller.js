import deleteLoteService from "../../services/lotes/deleteLote.service";

const deleteLoteController = ( req, res) => {
    const { id } = req.params;
    deleteLoteService(id)
    .then( result => {
        return res.status(result.status).json({"msg":result.message})
    })
    .catch( err => {
        return res.status(500).json({"error":err.message})
    })
};
export default deleteLoteController;
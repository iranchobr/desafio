const entity = "/animalsLote"
const controller = require("../controllers/animalsLoteController")
module.exports = (routes) => {
	routes
		.get(`${entity}`, controller.get)
		.post(`${entity}`, controller.post)
		.put(`${entity}/:id`, controller.put)
		.delete(`${entity}/:id`, controller.delete)
}
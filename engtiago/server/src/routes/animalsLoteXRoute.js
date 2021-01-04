const entity = "/animalsLoteXRoute"
const controller = require("../controllers/animalsLoteXController")
module.exports = (routes) => {
	routes
		.get(`${entity}`, controller.get)
		.get(`${entity}/getByAnimalId/:id`, controller.getByAnimalId)
		.post(`${entity}`, controller.post)
		.put(`${entity}/:id`, controller.put)
		.delete(`${entity}/:id`, controller.delete)
}
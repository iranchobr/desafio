const entity = "/animal"
const controller = require("../controllers/animalController")
module.exports = (routes) => {
	routes
		.get(`${entity}`, controller.get)
		.post(`${entity}`, controller.post)
		.put(`${entity}/:id`, controller.put)
		.delete(`${entity}/:id`, controller.delete)
}
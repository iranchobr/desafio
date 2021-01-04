const entity = "/pessoa"
const controller = require("../controllers/pessoaController")
module.exports = (routes) => {
	routes
		.get(`${entity}`, controller.get)
		.post(`${entity}`, controller.post)
		.put(`${entity}/:id`, controller.put)
		.delete(`${entity}/:id`, controller.delete)
}
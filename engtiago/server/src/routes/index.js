const { Router } = require("express")
const  Pessoa = require("./pessoaRoute")
const  Animal = require("./animalRoute")
const  AnimalsLote = require("./animalsLoteRoute")
const  AnimalsLoteXRoute = require("./animalsLoteXRoute")

module.exports = (app) => {
	const routes = Router()
  
	Pessoa(routes)
	Animal(routes)
	AnimalsLote(routes)
	AnimalsLoteXRoute(routes)
	

	app.use("/api/", [routes])
}
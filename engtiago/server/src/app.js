const express = require("express")
const app = express()
const  routes = require("./routes")

// disabling the flag for security purposes
app.disable("x-powered-by")

// middlewares
app.use(express.json())
app.use((req, res, next) => {

	// Website you wish to allow to connect
	// res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080")
	res.setHeader("Access-Control-Allow-Origin", "*")

	// Request methods you wish to allow
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")

	// Request headers you wish to allow
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type")

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", true)

	// Pass to next layer of middleware
	next()
})



//Rotas
routes(app)

//404 Route
app.use("*", (req, res) => {
	res.status(404).send({
		status: 404,
		message: "Não encontrado :(",
	})
})


 
module.exports = app


const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors())

routes(app)

app.listen(3333, () => console.log('Servidor iniciado na porta 3333'))

module.exports = app
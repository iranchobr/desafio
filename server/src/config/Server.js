const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require("./LoaderEnvironment");
const routesApp = require("./../routes/index");
const swaggerSpec = require("./Swagger");
const swaggerUi = require("swagger-ui-express");

// Setting middleware to parse datas in json.
app.use(bodyParser.json());

// Setting middleware logger http request.
app.use(morgan("combined"));

// Setting cors in api.
app.use(cors());

// Setting route with documentation of api swagger.
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setting routes app.
routesApp(app);

module.exports = app;
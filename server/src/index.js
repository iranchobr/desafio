const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("./config/LoaderEnvironment");
const routesApp = require("./routes/index");

// Setting middleware to parse datas in json.
app.use(bodyParser.json());

// Setting routes app.
routesApp(app);

app.listen(
    process.env.PORT,
    () => console.log(`Server is running in address: ${process.env.APP_URL}`)
);
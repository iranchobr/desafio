//chamda principal
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const bp = require("body-parser");
const app = express();
//-----------------------------------------------
app.use(cors());
app.use(express.json());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(routes);
app.use("/crud", routes);
app.listen(3001);
module.exports = app;

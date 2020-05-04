const express = require("express");
const BodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const router = require("./Router/index.js");

app.use(cors());

app.use(express.json());

app.use(BodyParser.json());

app.use(BodyParser.urlencoded({ extended: false }));

app.use("/", router);

app.listen(3000, () => console.log("Servidor Express rodando na porta: 3000"));

module.exports = app;

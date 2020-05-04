const express = require("express");
const routesFarm = require("./Farm");
const routesPeople = require("./People");
const routesAnimal = require("./Animal");
const routesBatch = require("./Batch");
const handlerException = require("../middlewares/HandlerException");
const extractorFieldReturn = require("../middlewares/ExtractorFieldReturn");

module.exports = (app) => {

    app.use("/farms", routesFarm(express.Router()));
    app.use("/peoples", extractorFieldReturn.extract, routesPeople(express.Router()));
    app.use("/animals", routesAnimal(express.Router()));
    app.use("/batchs", routesBatch(express.Router()));
    
    // Setting middleware handler exception application.
    app.use(handlerException);
}
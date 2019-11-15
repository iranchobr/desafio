const express = require("express");
const routesFarm = require("./Farm");
const routesPeople = require("./People");
const handlerException = require("../middlewares/HandlerException");

module.exports = (app) => {

    app.use("/farms", routesFarm(express.Router()));
    app.use("/peoples", routesPeople(express.Router()));
    

    // Setting middleware handler exception application.
    app.use(handlerException);
}
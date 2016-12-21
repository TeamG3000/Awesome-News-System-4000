/* globals require module */
'use strict';

const express = require("express");

module.exports = function (app, data) {
    const sourcesRouter = new express.Router();
    const sourceController = require("../controllers/source-item-controller")(data);

    sourcesRouter
        .get("/list", sourceController.getAllSources)
        .get("/select-media", sourceController.getAllSources)
        .post("/select-media", sourceController.saveSelectedSourceItemsToUser)
        .get("/source-details/:id", sourceController.getSourceDetails);

    app.use("/sources", sourcesRouter);
}

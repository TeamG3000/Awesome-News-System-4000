/* globals require module */

const express = require("express");

module.exports = function(app, data) {
    let detailedArticleRouter = new express.Router();
    let detailsArticleController = require("../controllers/details-article-controller")(data);

    detailedArticleRouter
        .get("/:id", detailsArticleController.getArticleDetails)
        .post("/:id", detailsArticleController.addArticleToFavorites)
        .post("/:id/rating", detailsArticleController.addRating);

    app.use("/article-details", detailedArticleRouter);
}
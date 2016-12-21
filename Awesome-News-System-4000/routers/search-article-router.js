/* globals require module */

const express = require("express");

module.exports = function(app, data) {
    let searchArticlesRouter = new express.Router();
    let searchArticleController = require("../controllers/search-article-controller")(data);

    searchArticlesRouter
        .get("/search", searchArticleController.searchArticles);

    app.use("/", searchArticlesRouter);
}
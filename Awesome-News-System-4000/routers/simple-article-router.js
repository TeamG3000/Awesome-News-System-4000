/* globals require module */

const express = require("express");

module.exports = function(app, data) {
    let simpleArticlesRouter = new express.Router();
    let simpleArticleController = require("../controllers/simple-article-controller")(data);

    simpleArticlesRouter
        .get("/", function(req, res) {
            res.redirect("/home");
        })
        .get("/home", simpleArticleController.getSimpleArticles)
        .get("/topRatedArticles", simpleArticleController.getTopRatedArticles);

    app.use("/", simpleArticlesRouter);
}
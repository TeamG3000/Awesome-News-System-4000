/* globals require module */

const express = require("express");

module.exports = function (app, data) {
    let commentRouter = new express.Router();
    let commentController = require("../controllers/comment-controller")(data);

    commentRouter
        .get("/", commentController.getComments)
        .post("/", commentController.createComment);

    app.use("/comment", commentRouter);
}
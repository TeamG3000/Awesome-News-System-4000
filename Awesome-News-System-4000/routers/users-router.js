'use strict';

module.exports = function(app, data) {
    const express = require("express");
    const usersController = require("../controllers/users-controller")(data);
    const authController = require("../controllers/auth-controller")(data);

    const usersRouter = express.Router();

    usersRouter
        .post("/login", authController.login)
        .post("/register", authController.register)
        .get("/profile", usersController.profile)
        .get("/favourites", usersController.getUserFavouriteArticles)
        .get("/favourites/:id", usersController.getUserArticle)
        .get("/settings", usersController.getUserSettings)
        .post("/settings", usersController.setUserSettings);

    app.use("/user", usersRouter);
}
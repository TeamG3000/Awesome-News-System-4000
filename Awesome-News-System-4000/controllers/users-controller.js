/* globals module */
"use strict";

const passport = require("../config/passport");

module.exports = function (data) {
    return {
        profile(req, res) {
            if (req.user === undefined) {
                return res.status(405).json("Not logged in.");
            } else {
                return res.status(200).json({
                    username: req.user.username,
                    settings: req.user.settings,
                    selectedMedia: req.user.selectedMedia,
                    favouriteArticles: req.user.favouriteArticles,
                    token: req.user.token
                });
            }
        },
        getUserFavouriteArticles(req, res) {
            return res.status(200).json({
                favouriteArtilces: req.user.favouriteArticles,
                token: req.user.token
            });
        },
        getUserArticle(req, res) {
            data.getDetailedArticleById(req.params.id)
                .then(article => {
                    return res.status(200).json({
                        result: article,
                        user: {
                            username: req.user.username,
                            settings: req.user.settings,
                            selectedMedia: req.user.selectedMedia,
                            favouriteArticles: req.user.favouriteArticles,
                            token: req.user.token
                        },
                        inFavourites: true
                    });
                });
        },
        getUserSettings(req, res) {
            data.getUserById(req.user.id)
                .then(user => {
                    return res.status(200).json({
                        settings: req.user.settings,
                        token: req.user.token
                    });
                });
        },
        setUserSettings(req, res) {
            let settings = [];
            settings.push({
                theme: req.body.theme
            });
            data.updateUserSettings(req.user.id, settings)
                .then(() => {
                    return res.status(200).json("Settings updated");
                });
        }
    }
}
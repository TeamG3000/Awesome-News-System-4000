'use strict';

const passport = require("../config/passport");

module.exports = function (data) {
    return {
        profile(req, res) {
            if (req.user === undefined) {
                return res.json("Not logged in.");
            } else {
                return res.json({
                    username: req.user.username,
                    settings: req.user.settings,
                    selectedMedia: req.user.selectedMedia,
                    favouriteArticles: req.user.favouriteArticles
                });
            }
        },
        getUserFavouriteArticles(req, res) {
            return res.json(req.user.favouriteArticles);
        },
        getUserArticle(req, res) {
            data.getDetailedArticleById(req.params.id)
                .then(article => {
                    return res.json({
                        result: article,
                        user: {
                            username: req.user.username,
                            settings: req.user.settings,
                            selectedMedia: req.user.selectedMedia,
                            favouriteArticles: req.user.favouriteArticles
                        },
                        inFavourites: true
                    })
                });
        },
        getUserSettings(req, res) {
            data.getUserById(req.user.id)
                .then(user => {
                    return res.json(req.user.settings);
                });
        },
        setUserSettings(req, res) {
            let settings = [];
            settings.push({
                theme: req.body.theme
            });
            data.updateUserSettings(req.user.id, settings)
                .then(() => {
                    return res.json("Settings updated");
                });
        }
    }
}
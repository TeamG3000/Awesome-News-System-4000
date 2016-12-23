'use strict';

const passport = require("passport");

module.exports = function (data) {
    return {
        login(req, res, next) {
            const auth = passport.authenticate('jwt', function (error, user) {

                if (error) {
                    next(error);
                    return;
                }

                if (!user) {
                    return res.json("Not authorized.");
                }

                req.login(user, error => {
                    if (error) {
                        next(error);
                        return;
                    }

                    return res.json({
                        user: {
                            username: req.user.username,
                            settings: req.user.settings,
                            selectedMedia: req.user.selectedMedia,
                            favouriteArticles: req.user.favouriteArticles,
                            token: req.user.token
                        }
                    });
                });
            });

            auth(req, res, next);
        },
        register(req, res) {
            const user = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                token: req.body.token
            };

            data.getAllSourceItemsIds()
                .then(sourceItemsIds => {
                    user.selectedMedia = [];
                    sourceItemsIds.forEach(id => {
                        user.selectedMedia.push({
                            name: id
                        });
                    });
                    user.settings = [];
                    user.settings.push({
                        theme: "Default"
                    });
                    data.createNewUser(user)
                        .then(dbUser => {
                            req.login(dbUser, error => {
                                if (error) {
                                    next(error);
                                    return;
                                }
                            });

                           return res.json({
                                user: {
                                    username: dbUser.username,
                                    settings: dbUser.settings,
                                    selectedMedia: dbUser.selectedMedia,
                                    favouriteArticles: dbUser.favouriteArticles,
                                    token: req.user.token
                                }
                            });
                        })
                        .catch(error => res.status(500).json(error));
                });
        }
    }
};
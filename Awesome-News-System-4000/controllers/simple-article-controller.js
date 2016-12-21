/* globals require module */

let passport = require("passport");

module.exports = function (data) {
    return {
        getSimpleArticles(req, res) {
            if (req.query.page === undefined) {
                req.query.page = 1;
            }

            if (isNaN(req.query.page)) {
                return res.json("page not found.");
            }

            data.getAllSourceItemsIds()
                .then(selectedMedia => {
                    if (req.isAuthenticated()) {
                        selectedMedia = [];
                        req.user.selectedMedia.forEach(media => {
                            selectedMedia.push(media.name);
                        });
                    }

                    data.getNewestSimpleArticles(req.query.page, selectedMedia)
                        .then(simpleArticles => {
                            if (req.headers["requester"] === "ajax") {
                                return res.json({
                                    simpleArticles: simpleArticles
                                });
                            } else {
                               return res.json({
                                    simpleArticles: simpleArticles,
                                    user: {
                                        username: req.user.username,
                                        settings: req.user.settings,
                                        selectedMedia: req.user.selectedMedia,
                                        favouriteArticles: req.user.favouriteArticles
                                    }
                                });
                            }
                        })
                        .catch(err => {
                            return res.json("Page not found.");
                        });
                });
        }
    }
};
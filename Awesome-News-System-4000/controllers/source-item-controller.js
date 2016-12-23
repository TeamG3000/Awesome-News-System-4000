/* globals require module */

const passport = require("passport");

module.exports = function (data) {
    return {
        getAllSources(req, res) {
            data.getAllSourceItems()
                .then(sourceItems => {
                    //if (req.isAuthenticated()) {
                       return res.json({
                            sourceItems: sourceItems,
                            // user: {
                            //     username: req.user.username,
                            //     settings: req.user.settings,
                            //     selectedMedia: req.user.selectedMedia,
                            //     favouriteArticles: req.user.favouriteArticles
                            // }
                        });
                    // } else {
                    //     res.render("../views/sources/sources-list", {
                    //         result: sourceItems,
                    //         user: req.user
                    //     });
                    // }
                })
                .catch(err => {
                    return res.json(err);
                });
        },
        saveSelectedSourceItemsToUser(req, res) {
            let userId = req.session.passport.user;
            let selectedSourceItems = req.body.selectedMedia;

            if (!Array.isArray(selectedSourceItems)) {
                selectedSourceItems = [selectedSourceItems];
            }

            data.updateUserWithSelectedMedia(userId, selectedSourceItems)
                .then(() => {
                    return res.json("Selected media updated.");
                })
                .catch(err => {
                    return res.json("Can't save selected media.");
                });
        },
        getSourceDetails(req, res) {
            if (req.isAuthenticated()) {
                data.getSourceById(req.params.id)
                    .then(sourceItem => {
                        if (sourceItem) {
                            let itemToReturn = {
                                id: sourceItem.id,
                                name: sourceItem.name,
                                description: sourceItem.description,
                                url: sourceItem.url,
                                category: sourceItem.category,
                                language: sourceItem.language,
                                country: sourceItem.country,
                                urlsToLogos: sourceItem.urlsToLogos
                            }
                            return res.json(itemToReturn);
                        } else {
                            return res.json("Can't find source.");
                        }
                    });
            } else {
                return res.json("Not authenticated.");
            }
        }
    }
}
/* globals require module */

const passport = require("passport");

module.exports = function (data) {
    return {
        getAllSources(req, res) {
            data.getAllSourceItems()
                .then(sourceItems => {
                       return res.status(200).json({
                            sourceItems: sourceItems
                        });
                })
                .catch(err => {
                    return res.status(404).json(err);
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
                    return res.status(200).json("Selected media updated.");
                })
                .catch(err => {
                    return res.status(405).json("Can't save selected media.");
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
                            return res.status(200).json(itemToReturn);
                        } else {
                            return res.status(404).json("Can't find source.");
                        }
                    });
            } else {
                return res.status(405).json("Not authenticated.");
            }
        }
    }
}
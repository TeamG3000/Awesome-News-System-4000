/* globals require module */

let passport = require("passport");

module.exports = function (data) {
    let allSimpleArticles = [];
    return {
        getSimpleArticles(req, res) {
            data.getAllSourceItemsIds()
                .then(selectedMedia => {
                    if (req.body.user !== null && req.body.user !== undefined) {
                        selectedMedia = [];
                        console.log(req.body.user.selectedMedia);
                        req.body.user.selectedMedia.forEach(media => {
                            selectedMedia.push(media.name);
                        });
                    }
                    console.log(req.body.page);
                    console.log(selectedMedia);
                    data.getNewestSimpleArticles(req.body.page, selectedMedia)
                        .then(simpleArticles => {
                            if (req.body.user === null || req.body.user === undefined) {
                                return res.status(200).json({
                                    simpleArticles: simpleArticles
                                });
                            } else {
                                console.log(req.body.user.username);
                                return res.status(200).json({
                                    simpleArticles: simpleArticles,
                                    user: {
                                        username: req.body.user.username,
                                        settings: req.body.user.settings,
                                        selectedMedia: req.body.user.selectedMedia,
                                        favouriteArticles: req.body.user.favouriteArticles,
                                        token: req.body.user.token
                                    }
                                });
                            }
                        })
                        .catch(err => {
                            return res.status(404).json("Page not found.");
                        });
                });
        },
        getTopRatedArticles(req, res) {
            data.getTopOneHundredArticles()
                .then(topDetailedArticles => {
                    let promiseArr = [];
                    for (var index = 0; index < topDetailedArticles.length; index++) {
                        let simpleArticle = data.getSingleSimpleArticleByName(topDetailedArticles[index].title, topDetailedArticles[index].source)
                        promiseArr.push(simpleArticle);
                    }
                    return promiseArr;
                })
                .then(promiseArr => {
                    Promise.all(promiseArr)
                        .then(articles => {
                            return res.status(200).json({ topArticles: articles });
                        })
                        .catch(err => {
                            return res.status(404).json("top articles error");
                        });
                });
        }
    }
};
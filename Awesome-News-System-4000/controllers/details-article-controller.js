/* globals require module */

const passport = require("passport");

module.exports = function (data) {
    return {
        getArticleDetails(req, res) {
            data.getSimpleArticleById(req.params.id)
                .then(result => {
                    data.getArticleDetailsBySourceAndTitle(result)
                        .then(articleDetails => {
                            return res.status(200).json({
                                result: articleDetails
                            });
                        });
                });
        },
        addArticleToFavorites(req, res) {
            data.getDetailedArticleById(req.params.id)
                .then(article => {
                    let isContained = 0;
                    req.body.user.favouriteArticles.forEach(function (element) {
                        if (element.title === article.title) {
                            isContained += 1;
                        }
                    }, this);
                    if (isContained === 0) {
                        data.getUserByUsername(req.body.user.username)
                            .then(user => {
                                data.addArticleToUserFavorites(user, article, req.body.originalId)
                                    .then(() => {
                                        return res.status(200).json("Article added to favourite articles.");
                            });
                        });
                    } else {
                        return res.status(406).json("Can't add article to favourite articles.")
                    }
                })
        },
        addRating(req, res) {
            data.getDetailedArticleById(req.params.id)
                .then(article => {
                    let rating = req.body.rating;
                    if (isNaN(rating)) {
                        return res.status(405).json("Rating must be number.");
                    }

                    if (+rating < 0 || +rating > 5) {
                        return res.status(405).json("Rating must be between 0 and 5.");
                    }

                    let newRating = (article.rating * article.timesRated) + +rating;
                    article.timesRated += 1;

                    let ratingToAdd = newRating / article.timesRated;
                    data.addRatingToArticle(article.id, ratingToAdd, article.timesRated)
                        .then(updatedArticle => {
                            return res.status(200).json({
                                message: "Rating added successfully.",
                                article: updatedArticle
                            });
                        });
                });
        }
    }
};
/* globals module Promise*/

module.exports = function(models) {
    let detailedArticle = models.detailedArticle;
    let dbUser = models.user;

    return {
        getArticleDetailsBySourceAndTitle(article) {
            return new Promise((resolve, reject) => {
                detailedArticle.findOne({ source: article.source, title: article.title }, (err, article) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(article);
                });
            });
        },
        getDetailedArticleById(id) {
            return new Promise((resolve, reject) => {
                detailedArticle.findOne({ _id: id }, (err, article) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(article);
                });
            });
        },
        addCommentByArticle(articleId, comment) {
            const newComment = {
                author: comment.author,
                content: comment.content,
                date: comment.date
            };
            return new Promise((resolve, reject) => {
                detailedArticle.findOneAndUpdate({ _id: articleId }, {
                    $push: {
                        comments: newComment
                    }
                }, { new: true }, (err, doc) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(doc);
                })
            })
        },
        addArticleToUserFavorites(user, article, originaId) {
            return new Promise((resolve, reject) => {
                dbUser.findOneAndUpdate({ _id: user.id }, {
                    $push: {
                        favouriteArticles: {
                            source: article.source,
                            title: article.title,
                            imageUrl: article.imageUrl,
                            publishedAt: article.publishedAt,
                            originalId: originaId
                        }
                    }
                }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user);
                })
            });
        },
        addRatingToArticle(articleId, ratingToAdd, timesRatedToAdd) {
            return new Promise((resolve, reject) => {
                detailedArticle.findOneAndUpdate({ _id: articleId }, {
                    $set: {
                        rating: ratingToAdd,
                        timesRated: timesRatedToAdd
                    }
                }, { new: true }, (err, article) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(article)
                });
            });
        },
        getTopOneHundredArticles() {
            return new Promise((resolve, reject) => {
                detailedArticle.find({}, (err, articles) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(articles);
                }).where('rating').gt(0).sort({ rating: -1 }).limit(100);
            });
        }
    }
}
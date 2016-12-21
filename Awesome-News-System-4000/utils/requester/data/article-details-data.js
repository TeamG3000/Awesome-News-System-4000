/* globals module Promise */

module.exports = function(models) {
    let ArticleDetails = models.articleDetails;

    return {
        pushArticleDetailsToDatabase(article) {
            let articleDetails = new ArticleDetails({
                source: article.source,
                title: article.title,
                imageUrl: article.urlToImage,
                publishedAt: article.publishedAt,
                author: article.author,
                description: article.description,
                url: article.url,
                comments: article.comments,
                rating: article.rating,
                timesRated: article.timesRated
            });

            return new Promise((resolve, reject) => {
                ArticleDetails.findOne({ source: article.source, title: article.title }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!result) {
                        articleDetails.save(err => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(articleDetails);
                        });
                    }
                });
            });
        }
    }
}
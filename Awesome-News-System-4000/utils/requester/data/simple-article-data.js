/* globals module Promise */

module.exports = function(models) {
    let SimpleArticle = models.simpleArticle;

    return {
        pushSimpleArticleToDatabase(article) {
            let simpleArticle = new SimpleArticle({
                source: article.source,
                title: article.title,
                imageUrl: article.urlToImage,
                publishedAt: article.publishedAt
            });

            return new Promise((resolve, reject) => {
                SimpleArticle.findOne({ source: article.source, title: article.title }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!result) {
                        simpleArticle.save(err => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(simpleArticle);
                        });
                    }
                });
            });
        }
    }
}
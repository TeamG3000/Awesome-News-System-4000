/* globals module Promise*/

module.exports = function (models) {
    let detailedArticle = models.detailedArticle;
    let Comment = models.comment;

    return {
        getCommentsByArticle(articleId) {
            return new Promise((resolve, reject) => {
                detailedArticle.findOne({ _id: articleId }, (err, article) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(article.comments);
                });
            });
        },
        addComment(articleId, comment) {
            return new Promise((resolve, reject) => {
                if (comment.content.length === 0) {
                    reject("Comment content can not be empty");
                }

                if (comment.author.length === 0) {
                    reject("Comment content can not be empty");
                }

                const newComment = new Comment({
                    author: comment.author,
                    content: comment.content,
                    date: comment.date
                });

                newComment.save(err => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(newComment);
                })
            });
        }
    }
}
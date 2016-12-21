/* globals require module */

module.exports = function (data) {
    return {
        getComments(req, res) {
            const articleId = req.query.articleId;
            data.getDetailedArticleById(articleId)
                .then(article => {
                   return res.json({
                        comments: article.comments
                    });
                })
                .catch(() => {
                    return res.json("Can't get comments.")
                })

        },
        createComment(req, res) {
            if (!req.isAuthenticated()) {
                return res.json("Not Authenticated.");
            }

            const commentContent = req.body.commentContent;
            if (commentContent === undefined || commentContent.length === 0) {
                return res.json("Comment can't be empty.");
            }

            const username = req.user.toObject().username;
            const newComment = {
                author: username,
                content: req.body.commentContent,
                date: new Date()
            };

            const articleId = req.body.articleId;

            data.addComment(null, newComment)
                .then((comment) => {
                    return data.addCommentByArticle(articleId, comment);
                })
                .then(article => {
                    return res.json({
                        comments: article.comments
                    });
                })
                .catch(err => {
                    return res.json("Error when adding comment.");
                });
        }
    }
};
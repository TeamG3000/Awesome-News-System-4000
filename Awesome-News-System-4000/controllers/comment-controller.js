/* globals require module */

module.exports = function (data) {
    return {
        getComments(req, res) {
            const articleId = req.query.articleId;
            data.getDetailedArticleById(articleId)
                .then(article => {
                   return res.status(200).json({
                        comments: article.comments
                    });
                })
                .catch(() => {
                    return res.status(404).json("Can't get comments.")
                })

        },
        createComment(req, res) {
            let commentContent = req.body.commentContent;
            if (commentContent === undefined || commentContent.length === 0) {
                return res.status(405).json("Comment can't be empty.");
            }

            let username = req.body.user.username;
            let newComment = {
                author: username,
                content: commentContent,
                date: new Date()
            };

            const articleId = req.body.articleId;

            data.addCommentByArticle(articleId, newComment)
                .then(article => {
                    return res.status(200).json({
                        comments: article.comments
                    });
                })
                .catch(err => {
                    return res.status(406).json("Error when adding comment.");
                });
        }
    }
};
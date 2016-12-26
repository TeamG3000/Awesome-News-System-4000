/* globals require module */

module.exports = function (data) {
    return {
        searchArticles(req, res) {
            if (req.query.search.length !== 0) {
                let searchPhrase = req.query.search
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
                data.getSimpleArticleByName(searchPhrase)
                    .then(articles => {
                        return res.status(200).json({
                            articles: articles
                        });
                    });
            } else {
                return res.status(404).json("No articles found.");
            }
        }
    }
};
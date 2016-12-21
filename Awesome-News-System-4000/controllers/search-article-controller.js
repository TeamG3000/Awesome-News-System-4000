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
                    .then(article => {
                        return res.json({
                            articles: article,
                            user: {
                                username: req.user.username,
                                settings: req.user.settings,
                                selectedMedia: req.user.selectedMedia,
                                favouriteArticles: req.user.favouriteArticles
                            }
                        });
                    });
            } else {
                return res.json("No articles found.");
            }
        }
    }
};
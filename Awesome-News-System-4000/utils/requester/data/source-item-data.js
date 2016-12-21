/* globals module Promise */

module.exports = function (models) {
    let SourceItem = models.sourceItem;

    return {
        pushSourceToDatabase(item) {
            let sourceItem = new SourceItem({
                id: item.id,
                name: item.name,
                description: item.description,
                url: item.url,
                category: item.category,
                language: item.language,
                country: item.country,
                urlsToLogos: item.urlsToLogos,
                sortBysAvailable: item.sortBysAvailable
            });

            return new Promise((resolve, reject) => {
                SourceItem.findOne({ id: item.id }, (err, result) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!result) {
                        sourceItem.save(err => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(sourceItem);
                        });
                    }
                });
            });
        }
    }
};
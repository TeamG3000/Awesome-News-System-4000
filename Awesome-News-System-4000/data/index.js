/* globals module require __dirname global */

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

module.exports = function (config) {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);

    let simpleArticle = require("../models/simple-article-model");
    let detailedArticle = require("../models/details-article-model");
    let user = require("../models/user-model");
    let sourceItem = require("../models/source-item-model");
    let comment = require("../models/comment-model");

    let models = { simpleArticle, detailedArticle, user, sourceItem, comment };

    let data = {};

    fs.readdirSync("./data")
        .filter(x => x.includes("-data"))
        .forEach(file => {
            let dataModule =
                require(path.join(__dirname, file))(models);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                })
        });

    return data;
};
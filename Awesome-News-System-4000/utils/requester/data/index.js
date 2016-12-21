/* global require module __dirname */
"use strict";

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

module.exports = function(config) {
    mongoose.Promise = global.Promise;
    mongoose.createConnection(config.connectionString);

    let sourceItem = require("../../../models/source-item-model");
    let articleDetails = require("../../../models/details-article-model");
    let simpleArticle = require("../../../models/simple-article-model");

    let models = { sourceItem, articleDetails, simpleArticle };

    let data = {};

    fs.readdirSync("./utils/requester/data")
        .filter(x => x.includes("-data"))
        .forEach(file => {
            let dataModule =
                require(path.join(__dirname, file))(models);

            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

    return data;
};
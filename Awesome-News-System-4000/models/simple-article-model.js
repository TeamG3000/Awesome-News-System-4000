/* globals module require */

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

let simpleArticleSchema = new mongoose.Schema({
    source: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    publishedAt: {
        type: String
    }
});

simpleArticleSchema.plugin(mongoosePaginate);
mongoose.model("SimpleArticle", simpleArticleSchema);
module.exports = mongoose.model("SimpleArticle");
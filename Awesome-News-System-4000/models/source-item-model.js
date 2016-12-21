/* globals require module */

const mongoose = require("mongoose");

let schema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    urlsToLogos: {
        small: {
            type: String,
            required: true
        },
        medium: {
            type: String,
            required: true
        },
        large: {
            type: String,
            required: true
        }
    },
    sortBysAvailable: [{
        type: String,
        required: true
    }]
});

mongoose.model("SourceItem", schema);

module.exports = mongoose.model("SourceItem");
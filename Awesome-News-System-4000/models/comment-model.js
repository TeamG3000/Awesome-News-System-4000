/* globals module require */

const mongoose = require("mongoose");

let commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

mongoose.model("Comment", commentSchema);
module.exports = mongoose.model("Comment");